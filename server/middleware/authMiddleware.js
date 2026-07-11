const jwt = require("jsonwebtoken");
// importing jsonwebtoken

const User = require("../models/User");

// creation of middleware function :-

const protect = async (req , res , next) => {
    try {
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({
                success : false ,
                message : "Not authorized" ,
            });
        }
        
        const token = authHeader.split(" ")[1];
        // extracting token 

        const decoded = jwt.verify(
            token , 
            process.env.JWT_SECRET
        );
        // verifying token

        const user = await User.findById(decoded.id).select("-password");
        // find user , and select everything except password.

        req.user = user;
        // attach user to req.user

        next();

    } catch (error){
        console.log(error);

        return res.status(401).json({
            success : false  , 
            message : "Not authorized , token failed"
        });
    }
};


// next is one of the most important concept in middleware , whenever a request is being made, it first passes thru middleware , middleware checks if the person is authenticated , if yes , next , if no, it will return a response for the previous request and never calls next().


module.exports = protect;

