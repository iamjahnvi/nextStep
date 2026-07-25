const express = require("express");

const {signup , login} = require(../controllers/authController);
<!-- we wrote {} outside signup  , becuase later we will import login, updateProfile, etc-->

const router = express.Router();

router.post("/signup" , signup);

router.post("login" , login);

module.exports = router;

