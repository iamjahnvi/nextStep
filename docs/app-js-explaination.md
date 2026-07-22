we had wrote :-
const express = require("express");
<!-- importing express library -->
<!-- 
const : keyword 
express : variable name 
require() : built-in function in Node.js , used to import modules, files, or packages into your current file.
-->

const app = express();
<!-- 
express() : it is a top-level function exported by the express module that we imported above.
calling it creates an Express Application Instance.
-->

app.get("/" , (req,res) => {
    res.send("Next Step Backend is running")
});
<!-- 
this is a standard syntax defined by the express for handling GET requests. 

the structire always takes at least two arguments :-
1. A path (string)
2. A callback function that handles the request and response.

-->

module.exports = app;
<!-- allow the server.js to use the app we just created -->




