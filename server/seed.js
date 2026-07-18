const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Exam = require("./models/Exam");
const exams = require("./data/exams");

dotenv.config();

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);


        await Exam.deleteMany();

   

        await Exam.insertMany(exams);

       

        process.exit();
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

seedDatabase();