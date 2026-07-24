const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        <!-- the await keyword is written here to pause the execution of this asynchronous function until Mongoose sucessfully establishes a connection with your MongoDB database. -->
        <!-- mongoose.connect is a method provided by Mongoose library to connect our Node.js application to  MongoDB database. -->

        console.log(`MongoDB connected : ${conn.connection.host}`);
        <!-- conn.connection.host: Digs into the connection object returned by Mongoose to dynamically extract and display the hostname or IP address of the specific database server you just connected to (for example, cluster0.abcde.mongodb.net or localhost). -->

    } catch(error) {
        console.error("Database Connection Failed");
        <!-- A custom, human-readable string to give you immediate context about where or what failed when you glance at your server logs. -->

        console.error(error.message);
        <!-- console.error() is an in-built method in node.js to print error messages to the console. -->

        process.exit(1);
        <!-- we called this so that the server doesn't continue when your password is wrong/internet is off/atlas is down. -->
    }
}

module.exports = connectDB;