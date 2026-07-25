const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
    name: String,
    fullForm: String,

    minimumAge: Number,

    registrationStartDate: Date,
    registrationEndDate: Date,

    officialWebsite: String,

    description: String,

    eligibility: {
        minimumEducation: String,
        minimumPercentage: Number,
        streamsAllowed: [String]
    },

    subjects: [String],

    redditLinks: [String],

    quoraLinks: [String]
} , {
    timestamps : true,
});

const Exam = mongoose.model("Exam" , examSchema);

module.exports = Exam;
