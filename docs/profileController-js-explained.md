cont User = require("../models/User");

const updateProfile = async(req,res) => {
    try{

        <!-- read the data(whenever we talk about reading the data , we have to do object destructuring , in js.) -->

        const{
            age ,
            educationLevel ,
            stream ,
            subjects ,
        } = req.body;

        <!-- initialize the profile of a user if it doesn't exist , remember a new user signs up with no profile -->

        if(!req.user.profile){
            profile : {}
        }

        <!-- update the fields that were sent by the user -->

        if(age!== undefined){
            req.user.profile.age = age;
        }
        if(educationLevel!== undefined){
            req.user.profile.educationLevel = educationLevel ;
        }
        (stream!== undefined){
            req.user.profile.stream = stream;
        }
        if(subjects!== undefined){
            req.user.profile.subjects = subjects;
        }

        awaitt req.user.save();

        return res.status(200).json({
            sucess : true ,
            message : "Profile updated succesfully" ,
            profile : req.user.profile ,
        })


    } catch (error) {
        console.log(error);

        res.status(500).json({
            success : false ,
            message : "Internal server issue" ,
        })
    }
}

module.exports = {
    updateProfile ,
};