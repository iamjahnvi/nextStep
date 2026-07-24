const signup = async(req,res) => {
    res.status(201).json({
        success : true ,
        message : "Signup endpoint created",
    })
}

module.exports = signup;

