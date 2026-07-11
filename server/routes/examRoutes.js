const express = require('express');

const protect = require("../middleware/authMiddleware");

const {
    recommendExams , 
} = require("../controllers/examController");

const router = express.Router();

router.get("/recommend" , protect , recommendExams);

module.exports = router;

