const app = require("./app");
<!-- ./ means look for app.js file in the same folder -->

const PORT = 5000;
<!-- 
in your server.js file ,  this line defines the port number on which your web server will listen to incoming requests.

a port number is a virtual "door" or communication endpoint on your computer that tells the incoming traffic exactlly which application or service it should be delievered to.
-->

app.listen(PORT , () => {
    console.log(`Server is running on port {PORT}`);
})
<!--
listens to all the incoming requests , that comes on PORT - 5000
-->