const User = require("../models/User");

const bcrypt = require("bcrypt");

const generateToken = require("../utils/generateToken");

const {
    validateEmail,
    validatePassword,
    validateName,
    validatePercentage,
} = require("../utils/validation");

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

        // ---------------------------------------------------------------------
        // Email format validation (server-side)
        // HOW: validateEmail() runs a regex against the submitted email and
        //   rejects it if it is not a properly structured address.
        // WHY: Prevents malformed email addresses (e.g. "abc@", "user@.com")
        //   from being created in the database.
        // ---------------------------------------------------------------------
        const emailCheck = validateEmail(email);
        if(!emailCheck.valid){
            return res.status(400).json({
                success : false ,
                errors : { email : emailCheck.message },
            });
        }

        // ---------------------------------------------------------------------
        // Password strength validation (server-side)
        // HOW: validatePassword() enforces production-grade rules: min 8 chars,
        //   at least one letter, one number, and one special character.
        // WHY: Weak passwords are the #1 security risk. Enforcing this on the
        //   server means the rule cannot be bypassed from the browser.
        // ---------------------------------------------------------------------
        const passwordCheck = validatePassword(password);
        if(!passwordCheck.valid){
            return res.status(400).json({
                success : false ,
                errors : { password : passwordCheck.message },
            });
        }

        // ---------------------------------------------------------------------
        // Name validation (server-side)
        // HOW: validateName() ensures the name contains only letters (plus
        //   spaces/hyphens/apostrophes for real compound names).
        // WHY: Flags users who enter numbers or special symbols as their name,
        //   keeping the database clean and the profile display sane.
        // ---------------------------------------------------------------------
        const nameCheck = validateName(name);
        if(!nameCheck.valid){
            return res.status(400).json({
                success : false ,
                errors : { name : nameCheck.message },
            });
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

        // ---------------------------------------------------------------------
        // Email format validation on LOGIN flow (server-side)
        // HOW: Same validateEmail() regex used in signup is applied here, so the
        //   login form also flags an incorrectly-typed email before we even look
        //   the user up in the database.
        // WHY: Gives the user immediate, clear feedback at the very first point
        //   of entry rather than hiding behind a generic "invalid credentials".
        // ---------------------------------------------------------------------
        const emailCheck = validateEmail(email);
        if(!emailCheck.valid){
            return res.status(400).json({
                success : false ,
                errors : { email : emailCheck.message },
            });
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
    console.log("body recieved");
    console.log(req.body);
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
            req.user.profile.age = age;
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

        if(percentage!==undefined){
            // -----------------------------------------------------------------
            // Percentage validation (server-side)
            // HOW: validatePercentage() blocks negative values (and values > 100).
            // WHY: A negative percentage is impossible in reality; accepting it
            //   would corrupt the profile and skew the exam recommendation query
            //   that compares user percentage against exam minimums.
            // -----------------------------------------------------------------
            const percentageCheck = validatePercentage(Number(percentage));
            if(!percentageCheck.valid){
                return res.status(400).json({
                    success : false ,
                    errors : { percentage : percentageCheck.message },
                });
            }
            req.user.profile.percentage = percentage;
        }

        await req.user.save();
        console.log("After save");
        console.log(req.user.profile);

        return res.status(200).json({
            success : true ,
            message : "Profile updated successfully" ,
            user : {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email,
                age: req.user.profile.age,
                educationLevel: req.user.profile.educationLevel,
                percentage: req.user.profile.percentage,
                stream: req.user.profile.stream,
                subjects: req.user.profile.subjects
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

