const express = require("express");

const {signup , login , getMe} = require(../controllers/authController);
<!-- we wrote {} outside signup  , becuase later we will import login, updateProfile, etc-->

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup" , signup);

router.post("login" , login);

router.get("/getMe" ,protect , getMe);

module.exports = router;

