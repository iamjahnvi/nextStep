require("dotenv").config();

const app = require("./app");
// import the express app

const connectDB = require("./config/db");
// connecting database

const PORT = process.env.PORT || 5000;
// we are hardcoding it , rn we'll use .env.

const startServer = async() => {
    // we have used async so that  functions keep on happening in background , which takes time to operate and have heavy code , and proceed further with functions with non-heavy code.
    await connectDB();

    app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`)
    });

    // this starts the server , like it means keep listening to the incoming requests

}

startServer();


