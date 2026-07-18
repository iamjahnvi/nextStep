const express = require("express");
// importing express app

const router = express.Router();
// method of express, whose functioning we'll store in variable router

const authRoutes = require("./authRoutes")
const examRoutes = require("./examRoutes");

router.get("/" , (req,res) => {
    res.json({
        success : true , 
        message : "Next Step API v1"
    });
});

router.use("/auth" , authRoutes);
router.use("/exams", examRoutes);
module.exports = router;