const jwt = require("jsonwebtoken");

const User = require("../models/User");

const protect = async(req , res ,next) => {
    try {


    } catch(error) {

    }
};

<!-- it is important to write next here, so that the process can move forward(from middleware to controller) , becuase middleware functioning happens somewhere in between of starting and ending point.
if the middleware decides the user is authenticated , it calls next() -->