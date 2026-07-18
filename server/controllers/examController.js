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
            message : exam
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