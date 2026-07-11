const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Exam = require("./models/Exam");
const exams = require("./data/exams");

dotenv.config();

mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log("Database Connected"))
.catch((err) => console.log(err));

const seedDatabase = async () => {
    try {

    } catch (error) {

    }
};

Exam.deleteMany();

// This removes all existing exam documents to avoid duplicates.

Exam.insertMany(exams);
// This inserts all existing exam documents.

console.log("Exam data inserted successfully.");

mongoose.connection.close();

seedDatabase();