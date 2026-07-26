const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken");

const signup = async(req,res) => {
    try {
        <!-- reads fields inputed by the user -->
        const{name , email , password } = req.body;


        <!-- validate user : check if any field is missing -->
        if(!name || !email || !password) {
            return res.status(400).json({
                success : false ,
                message : "All fields are required!"
            })
        }
        <!-- return keyword is being written so that execution can be stopped immediately after sending response  -->


        <!-- check for existing user -->
        const existingUser = await User.findOne({email});

        <!-- 
        await : it is keyword is written because it is a mongoose query being resolved.
        User : model name
        .findOne : method of mongoose model , that searches the whole database for a single document matching the condition inside curly braces
        {email} is shorthand for {email : email}
        -->

        if(existingUser){
            return res.status(409).json({
                success : false ,
                message : "Email is already registered"
            })
        }

        <!-- hash password -->

        const hashedPassword = await bcrypt.hash(password , 10);
        <!-- 10 is salt rounds(industry standard), in layman we can consider it as the amount of work which is being done to hash the password -->

        const user = await User.create({
            name  ,
            email ,
            password : hashedPassword,
        });

        return res.status(201).json({
            success : true , 
            message : "User registered successfully" ,
            user : {
                id : user._id;

                <!-- We write user._id with an underscore because MongoDB natively names the unique identifier field _id for every document it stores. -->

                name : user.name ,
                email : user.email ,
            } ,
        }) ;

    } catch(error) {
        console.log(error);
        res.status(500).json({
            success : false ,
            message : "Internal Server Issue" ,
        })
    }
}

const login = async(req, res) => {
    try{
        const{email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success : false ,
                message : "All fields are required";
            })
        }

        const user = await User.findOne({email});

        if(!user){
            res.status(401).json({
                success : false ,
                message : "User doesn't exist";
            })
        }

        <!-- comparing passwords :- -->
        const isPasswordCorrect = await bcrypt.compare(
            password , 
            user.password
        );

        if(!isPasswordCorrect){
            res.status(401).json({
                success : false ,
                message : "Password is incorrect";
            })
        }

        const token = generateToken(user._id);
        <!-- the main code to generate a token has been written in utils/generateToken.js  -->

    } catch(error) {
        console.log(error);

        res.status(500).json({
            success : false ,
            message : "Internal Server Issue",
        })
    }
}

const getMe = async (req ,res) => {
    return res.status(200).json({
        success : true , 
        user : req.user;
    })
}





module.exports = {
    signup, 
    login ,
    getMe
}