const updateProfile = async(req , res) => {
    console.log("BODY RECIEVED : ");
    console.log(req.body)
    try {
        const {
            age,
            educationLevel ,
            stream ,
            subjects ,
            percentage
        } = req.body;

        if(!req.user.profile) {
            req.user.profile = {};
        }

        if(age!==undefined){
            req.user.profile.age = age;
        }

        if(percentage!==undefined){
            req.user.profile.percentage = percentage;
        }

        if(stream!==undefined){
            req.user.profile.stream = stream;
        }

        if(educationLevel!==undefined){
            req.user.profile.educationLevel = educationLevel;
        }

        if(subjects!==undefined){
            req.user.profile.subjects = subjects;
        }

        await req.user.save();

        console.log("After save :- ");
        console.log(req.user);

        return res.status(200).json({
            success : true ,
            message : "Profile updated successfully" ,
            profile : req.user.profile ,
        })
    } catch(error) {
        console.log(error);

        return res.status(500).json({
            success : false ,
            message : "Internal server issue"
        });
    }
};

module.exports = {
    updateProfile,
};

