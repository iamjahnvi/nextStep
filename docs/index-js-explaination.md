const express = require("express");

const router = express.Router();
<!-- express.Router() is a built-in method provided by Express. It creates a new , isolated router object. It allows you to group  routes together rather than cluterring them in server.js only-->

router.get("/" , (req,res) => {
    res.json({
        success : true ,
        message : "NextStep backend is working"
    });
});

<!-- 
router : references the router object you just created.

(req,res) => {} : An ES6 arrow function that serves as the route handler callback.

req : req is the request object , that contains all the details about the incoming HTTP request from the client(headers, parameters, body , data, query etc.)

res : response object which is used by the server to construct and send back a reply to the client.

.json() : an express helper method that does three things automatically:-

1. serializes a js object into a valid json string.
2. sets the HTTP response header Content-Type to application/json.
3. sends that response back to the client.

-->

module.exports = router;