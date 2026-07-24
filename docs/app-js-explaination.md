we had wrote :-
const express = require("express");
<!-- importing express library -->
<!-- 
const : keyword 
express : variable name 
require() : built-in function in Node.js , used to import modules, files, or packages into your current file.
-->

const cors = require("cors");
<!--
imports cors(Cross-Origin Resource Sharing) package into your file.
why it's here :  By default, browsers block frontend applications (like a React or Vue app running on http://localhost:5173) from talking to a backend server running on a different domain or port (like http://localhost:3000) due to security rules. Importing this package gives you the tool required to unlock cross-origin communication.-->

const routes = require("./routes);

const app = express();
<!-- 
express() : it is a top-level function exported by the express module that we imported above.
calling it creates an Express Application Instance.
-->

app.use(cors());
<!-- this tells your express application to use the CORS middleware globally for every incoming request.
why it's here : it automatically attaches the appropriate HTTP headers to your server's responses. this signals the user's browser that the backend explicitly trusts outside frontend applications, allowing them to fetch data without being blocked. -->

app.use(express.json());
app.use(express.urlencoded({extended:true}));

<!-- 
it is an in-built express middlware function that parses incoming requests with JSON payloads.
why it's here : when a client sends data to the server via POST or PUT request , the raw data arrives as a stream of text bytes. This line intercepts that raw text , converts it into a usable js object, and attaches it to req.body, so that you can easily write code like req.body.email.
-->

app.use("/api/v1" , routes);

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




