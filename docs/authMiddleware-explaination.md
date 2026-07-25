const jwt = require("jsonwebtoken");

const User = require("../models/User");

const protect = async(req , res ,next) => {
    try {
        const authHeader = req.headers.authorization;
        <!-- 
        req : requested body coming from client ,
        // This is a simplified representation of the `req` object :-
        const req = {
            method: 'GET',
            url: '/api/user/profile',
            params: {},
            query: {},
            body: {},
            headers: {
            'host': 'api.mywebsite.com',
            'user-agent': 'Mozilla/5.0 (Windows NT 10     Win64; x64)',
            'accept': 'application/json',
            'authorization': 'Bearer     eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' 
        } -->


        console.log(authHeader);

        if(!authHeader || !authHeader.startsWith("Bearer")){
            retrun res.status(401).json({
                success : false ,
                message : "Not authorized" ,
            })
        }

        const token = authHeader.split(" ")[1];

        <!-- 
        suppose authHeader = Bearer abc123xyz 
        then after splitting : ["Bearer" , "abc123xyz"]
        index:1 is the token 
        -->

        <!-- verifying token -->

        const decoded = jwt.verify(
            token , 
            process.env.JWT_SECRET
        );

        <!-- finally we will get the user -->

        const user = await User.findById(decoded.id).select("-password");
        <!-- when u call jwt.verify(token, process.env.JWT_SECRET) , the jwt library takes that long gibbresh token string , checks if it is valid and unlocks it.
        The result of this unlocking is an object containing the data that we'd originally packed in jwt.sign()-->

        req.user = user;

        next();

        } catch(error) {
            console.log(error);

            return res.status(500).json({
                success : false , 
                message : "Internal server issue"
            });
    }
}

<!-- it is important to write next here, so that the process can move forward(from middleware to controller) , becuase middleware functioning happens somewhere in between of starting and ending point.
if the middleware decides the user is authenticated , it calls next() -->


module.exports = protect;