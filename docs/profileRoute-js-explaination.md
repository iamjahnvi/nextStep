const express = require("express");

const protect = require("../middleware/authMiddleware");

const {updateProfile} = require("../controllers/profileController");

const router = express.Router();

router.patch("/" , protect  , updateProfile );

module.exports = router;