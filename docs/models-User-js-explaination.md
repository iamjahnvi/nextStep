const mongoose = require("mongoose");
<!-- import mongoose -->

const userSchema = new mongoose.Schema({
    <!-- new : it is the keyword that we use to create a brand new unique instance(object) of a class or constructor function, in this case , an instance of mongoose's Schema class. -->

    name : {
        type : String ,
        required : true , 
        trim : true ,
        minlength : 2,
        maxlength : 50,
    } ,
    email : {
        type : String,
        required : true ,
        trim : true ,
        unique : true,
        lowercase : true,

        <!-- MongoDB is strictly case-sensitive. By Default , it treats User@gmail.com and user@gmail.com as two completely diff strings.
        a malicious or careless user could register two accounts using the same email address just by changing the capitalization.-->
    }

    password : {
        type : String , 
        required : true,
        minlength : 8
    }

    profile : {
        age : {
            type : Number ,
        } , 

        educationLevel : {
            type: String,
        },

        stream: {
            type: String,
        },

        subjects: [
            {
                type: String,
            },
        ],

        careerInterests: [
            {
                type: String,
            },
        ]
    } ,
    {
        timestamps : true
    }
    <!-- this is written so that MongoDB automatically creates createdAt and updatedAt -->
})

const User = mongoose.model("User" , userSchema);

module.exports = User;