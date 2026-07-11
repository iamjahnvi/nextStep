const Exam = require("../models/Exam");

const recommendExams = async(req , res) => {
    try {
        const profile = req.user.profile;

        if(!profile){
            return res.status(400).json({
                success : false , 
                message : "Complete your profile first"
            });
        }
        // checks if the profile of user is completed

        const {
            minimumAge ,
            minimumEducationLevel ,
            stream , 
            percentage ,
            subjects ,
        } = profile ;

        const query = {
            minimumAge : {$lte : age} ,
            minimumEducationLevel : {$lte : educationLevel} ,
            streams : stream , 

            $or : [
                {
                    "eligibility.minimumPercentage" : {$exists : false}
                } ,
                {
                    "eligibility.minimumPercentage" : {$lte : percentage}
                }
            ]
        };

        const exams = await Exam.find(query);

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

module.exports = {
    reccomendExams ,
};