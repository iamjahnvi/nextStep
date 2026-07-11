const mongoose = require("mongoose");
// importing mongoose

const userSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true,
        trim : true,
        minlength : 2,
        maxlength : 50,
    } ,
    email : {
       type: String,
       required: true,
       unique: true,
       lowercase: true,
       trim: true,
    } ,
    password :{
        type : String,
        required : true,
        minlength : 0,
    } ,
    // point to be noted is that password never stores the plain text password written by us, it stores the value of it , after hashing.
    // name , email and password are authentication information

    profile : {
        age : {
            type : Number ,
        } ,
        educationLevel : {
            type : Number ,
            required : true ,
        },
        percentage : {
            type : Number ,
        } ,
        stream: {
            type : String
        },
        subject : [
            {
                type : String
            },
        ],

        careerInterests : [
            {
                type : String
            },
        ],
    },
    // we nested it , coz now it looks much more clear, it is called as embedding.
    // kept all profile related details in profile object
}, {
    timestamps: true
    // this was created so that, timstamps for when any of these
    // (email, password etc) , were being created and updated, that is being saved as :
    // createdAt
    // updatedAt
    
});

const User = mongoose.model('User', userSchema);
// creation of a model

module.exports = User;
// export User

// here model is User , which is generally written with a capslock.






















