const jwt = require("jsonwebtoken");

const generateToken = (id) => {
    <!-- this defines a reusable arrow function that accepts a single argument : the user's unique MongoDb ID(id) -->
    jwt.sign(
        {id} , 
        process.env.JwT_SECRET,
        {
            expiresIn : "7d",
        }
    )
}

module.exports = generateToken;

<!-- jwt.sign() is a core method provided by the jsonwebtoken library in Node.js. it's primary job is to create (or "sign") a secure , cryptographically encrypted token for a user. -->