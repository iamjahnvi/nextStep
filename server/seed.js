const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Exam = require("./models/Exam");
const exams = require("./data/exams");

dotenv.config();

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("Database Connected");

        await Exam.deleteMany();

        console.log("Old exams deleted");

        await Exam.insertMany(exams);

        console.log("Exam data inserted successfully");

        process.exit();
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

seedDatabase();