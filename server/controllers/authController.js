
const User = require("../models/User");

const bcrypt = require("bcrypt");

const generateToken = require("../utils/generateToken");

const signup = async (req , res) => {
    // res.status(201).json({
    //     success : true,
    //     message : "Signup endpoint working" ,
    // });

    // this was something that we had written for testing it on POSTMAN

    try{
        const{name , email , password , confirmPassword } = req.body;
        if(!name || !password || !email || !confirmPassword){
            return res.status(400).json({
                success : false ,
                errors : {
                    name : !name ? "Name is required" : null ,
                    email : !email ? "Email is required" : null ,
                    password : !password ? "Password is required" : null ,
                    confirmPassword : !confirmPassword ? "Password is required" : null
                }
            });
        }

        if(password.trim() != confirmPassword.trim()){
            return res.status(400).json({
                success : false , 
                message :  "Passwords don't match"
            })
        }

        const existingUser = await User.findOne({email});

        // findOne tells MongoDB: "Search through the collection and return the very first document that matches the criteria I give you." Even if there are multiple users with the same criteria, it stops searching after finding the first match. If it finds nothing, it returns null.

        // ({email})  : the argument passed to findOne , defining the search criteria

        // ({email}) is the shorthand for writing , ({email : email})
        // the email : email , is  a key value pair
        // email as , key means the field name inside mongodb database dovument.
        // email is the variable holding the actual email.


        if(existingUser){
            return res.status(409).json({
                success : false ,
                message : "Email already exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password,10);


        // bcrypt : a popular , battle-tested npm package(library) used for securely hashing passwords.

        // explaination : bcrypt is not built into Node.js; it is an external dependency that implements the Bcrypt password-hashing function . It is specifically engineered to be slow and computationally expensive.
        
        const user = await User.create({
            name ,
            email , 
            password : hashedPassword,
        });

        return res.status(201).json({
            success : true,
            message : "User registered successfully" ,
            user : {
                id: user._id,
                name: user.name ,
                email: user.email,
            },
        });
        // we respond with successful creation of profile of person, only after the data of the user has been saved in mongodb , otherwise if lessay , database is down , it would catch error , and hence print internal server issue.
    } catch(error) {
        console.log(error);

        return res.status(500).json({
            success : false ,
            message : "Internal server failed" 
        })
    }
}

const getMe = async (req , res) => {
    try{
        return res.status(200).json({
            success : true , 
            user : req.user,
        });
    } catch(error) {
    console.error(error);

    res.status(500).json({
        success : false ,
        messgae : "Internal Server error"
    });
}
} 

const login = async (req,res) => {
    try{
        const{email , password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success : false ,
                message : "All fields are required"
            })
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(401).json({
                success : false  , 
                message : "Invalid email or password"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(
            password ,
            user.password
        )
        if(!isPasswordCorrect){
            return res.status(401).json({
                success : false ,
                message : "Invalid email or password"
            })
        }

        const token = generateToken(user._id);

        return res.status(200).json({
            success : true ,
            message : "login successful",
            token,
            user : {
                id : user._id,
                name : user.name ,
                email : user.email ,

            } ,
        });



    } catch(error){
        console.log(error);

        return res.status(500).json({
            success : false ,
            message : "Internal server error" ,
        })

    };
}
const updateProfile = async(req , res) => {
    try {
        const {
            age,
            educationLevel ,
            stream ,
            subjects ,
            percentage ,
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
            req.user.educationLevel = educationLevel;
        }

        if(subjects!==undefined){
            req.user.subjects = subjects;
        }

        if(percentage!==undefined){
            req.user.percentage = percentage;
        }

        await req.user.save();

        return res.status(200).json({
            success : true ,
            message : "Profile updated successfully" ,
            user : {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email,
                age: req.user.age,
                educationLevel: req.user.educationLevel,
                percentage: req.user.percentage,
                stream: req.user.stream,
                subjects: req.user.subjects
            }
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
    signup ,
    login , 
    getMe ,
    updateProfile ,
};

