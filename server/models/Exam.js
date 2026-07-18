const mongoose = require("mongoose");
// imported mongoose

const examSchema = new mongoose.Schema({
    name  : {
        type : String , 
        required : true ,
        trim : true ,
    } ,

    fullForm : {
        type : String , 
        required : true ,
        trim : true ,
    },

    streams : {
        type : [String] ,
        required : true ,
    } ,

    minimumEducationLevel : {
        type : String , 
        required : true ,
        trim : true ,
    } ,

    minimumAge : {
        type : Number ,
    } ,

    registrationStartDate : {
        type : Date,
        required : true 
    } , 
    registrationEndDate : {
        type : Date,
        required : true 
    } ,

    officialWebsite : {
        type : String , 
        required : true , 
        trim : true
    } ,

    description : {
        type : String , 
        trim : true
    },

    eligibility : {
        minimumPercentage : Number,
      
    } ,

    subjects : {
        type : [String] ,
        required : true ,
    } ,

    redditLinks : [String] ,

    quoraLinks : [String] , 

} , {
    timestamps : true,
})

module.exports = mongoose.model("Exam" , examSchema);