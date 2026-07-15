const express = require("express");
// importing express

const cors = require("cors");
// importing cors , why?
// becuause later reacts will run on localhost:5173 and backend runs on localhost:5000 this way browser will block the communication b/w two diff origins by default , so here comes CORS , it tells thr browser it's fine let frontend(react) talk to me.
const routes = require("./routes");
const examRoutes = require("./routes/examRoutes");

const app = express();

app.use(cors());

app.use(express.json());
// using express

app.use(express.urlencoded({extended: true}));
// Useful for handling form submissions.
// We'll mostly use JSON,
// but adding it now is standard practice.

// this creates our express application, and everthing like routes, middleware, APIs will be attacted to app

app.use("/api/v1" , routes);

app.use("/api/v1/exams", examRoutes);

app.get("/" , (req,res) => {
    res.send("Next Step Backend is Running")
});
// get is a method
// req stands for request which is made
// res stands for response produced


module.exports = app;
// it allows server.js to use the app we just created

