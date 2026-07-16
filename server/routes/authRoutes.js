const express = require("express");

const {signup , login , getMe} = require("../controllers/authController");

// here the signup is written inside {} , becuase authController.js will export multiple functions later.
// like signup , login , logout , forgetPassword , reset Password.
// but rn we are only importing signup function

const router = express.Router();

const {protect} = require("../middleware/authMiddleware")

router.post("/signup" , signup);

router.post("/login" , login);

router.get("/me" , protect , getMe);

router.patch("/profile" , protect , updateProfile);

module.exports = router;



