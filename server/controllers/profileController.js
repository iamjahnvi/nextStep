const updateProfile = async(req , res) => {
    try {
        const {
            age,
            educationLevel ,
            stream ,
            subjects ,
        } = req.body;

        if(!req.user.profile) {
            req.user.profile = {};
        }

        if(age!==undefined){
            req.user.age = age;
        }

        if(stream!==undefined){
            req.user.stream = stream;
        }

        if(educationLevel!==undefined){
            req.user.educationLevel = minimumEducationLevel;
        }

        if(subjects!==undefined){
            req.user.subjects = subjects;
        }

        await req.user.save();

        return res.status(200).json({
            sucess : true ,
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

