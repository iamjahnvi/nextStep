require("dotenv").config();
<!-- why we did it has been explained in env-js-explaination -->

const app = require("./app");
<!-- ./ means look for app.js file in the same folder -->

const connectDB = require("./config/db")

const PORT = process.env.PORT || 5000;
<!-- 
in your server.js file ,  this line defines the port number on which your web server will listen to incoming requests.

a port number is a virtual "door" or communication endpoint on your computer that tells the incoming traffic exactlly which application or service it should be delievered to.
-->

const startServer = async() => {
    await connectDB();

    app.listen(PORT , () => {
        console.log(`Server is running on port ${PORT}`);
    })
    <!-- listen to all the incoming requests that comes on PORT - 5000 -->

}

startSever();

<!-- why did we write the code for startServer , becuase this is an architectural decision.
if the database is offline, then the server won't start only. also , if database is not available , users won't be able to log in , fetch exams etc -->