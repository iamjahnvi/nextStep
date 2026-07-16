const express = require('express');

const {protect} = require("../middleware/authMiddleware");

const {
    recommendExams , 
    getExamById
} = require("../controllers/examController");

const router = express.Router();

router.get("/recommend" , protect , recommendExams);

router.get("/:id" , protect , getExamById);

module.exports = router;

