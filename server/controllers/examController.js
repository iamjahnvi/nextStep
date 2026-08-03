const Exam = require("../models/Exam");

const recommendExams = async(req , res) => {
    console.log("recommend exams is running");
    try {
        const user = req.user;

        console.log("=== EXAM DEBUG: YOUR PROFILE DATA ===", user); // <--- Add this line!

        if(!user){
            return res.status(400).json({
                success : false , 
                message : "user not found"
            });
        }

        // checks if the profile of user is completed

        const {
            age ,
            educationLevel ,
            stream , 
            percentage ,
            subjects ,
        } = user.profile ;

        // reading the data , this is known as object destructing in javascript

        const query = {


            $and : [
                {
                    $or : [
                        {minimumAge : {$lte : age}} ,
                        {minimumAge : null}
                    ]
                } , 
                {
                    $or : [
                        {"eligibility.minimumPercentage" : {$exists : false}} ,
                        {"eligibility.minimumPercentage" : null},
                        {"eligibility.minimumPercentage" : {$lte : percentage}} 
                    ]
                }
            ] ,
            minimumEducationLevel : {$lte : educationLevel} ,
            streams : {$in : [stream]}

        };

        
        console.log("========== QUERY ==========");
        console.log(query);

        const exams = await Exam.find(query);

        const today = new Date();

        const updatedExams = exams.map((exam)=> {

            const{registrationStartDate,registrationEndDate} = exam;
            let status = " ";
            let openingIn = null;
            let closingIn = null;
            if(today < registrationEndDate && today > registrationStartDate){
                status = "Open"
                closingIn = registrationEndDate - today;
            } else if(today < registrationStartDate){
                status = "Opening soon"
                openingIn = registrationStartDate - today
            } else {
                status = "Closed"
            }

            return{
                ...exam.toObject() ,
                // these three dots mean the spread syntax in javascript , which helps to copies the properties of one object to another brand new object.
                // if we'd hv only written exam , it would hv copied the raw Mongoose document wrapper + your data + internal Mongoose properties but writing exam.toObject() , strips away mongoose baggage , leaving only , a clean js object with your new status fields.
                status ,
                openingIn,
                closingIn
            };
        });

        console.log("========== EXAMS ==========");
        console.log(exams);

        return res.status(200).json({
            success : true,
            count : exams.length ,
            data : exams ,
        })
        // standard way of returing , data , to frontend

        // object destructuring
        // it is a feature of js that allows us to extract properties from an obj and bind them to variables in a single clean line of code.

        // writing exam.registrationStartDate , exam.registrationEndDate etc is equivalent to saying const{registrationStartDate , registrationEndDate} = exam

    } catch(error) {
        console.log(error);

        return res.status(500).json({
            success : false ,
            message : "Internal server issue"
        });
    }
};

const getExamById = async (req  , res) => {
    try {

        const {id} = req.params;

        const exam = await Exam.findById(id);

        if(!exam){
            return res.status(404).json({
                success : false ,
                message : "Exam not found"
            })
        }

        return res.status(200).json({
            success : true,
            data : exam
        })

    } catch(error) {
        console.log(error);

        return res.status(500).json({
            success : false ,
            message : "Internal server issue"
        })
    }
}

module.exports = {
    recommendExams ,
    getExamById,
};