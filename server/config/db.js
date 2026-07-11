const mongoose = require("mongoose")
// import mongoose , which is the library to talk to MongoDB

const connectDB = async() => {
// we wrote asynchoronous here, bcz we know that connecting db takes time , so that can happen in background , while proceeding other tasks.
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB connected : ${conn.connection.host}`);
        // connection is being setup
    } catch(error) {
        console.error("database connection failed");
        console.error(error.message);

        process.exit(1);
        // this immediately stops the sever in case of error.
    }
};

module.exports = connectDB;

