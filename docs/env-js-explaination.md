for env , we will open server.js first and then , at the very top we will add :-

require("dotenv").config();
<!-- 
require is the keyword used for importing files, packages , lib etc 
here require("dotenv") means import the dotenv package which we have installed via npm , ie node package manager.

the dotenv package executes the precise function called config() , operates in the following manner :-

1. File System Lookup (fs.readFileSync)
-it attempts to locate and open a file named as .env in your project's root directory using process.cwd().
-it reads the entire file as raw text data using utf8 encoding by default.

2. Parsing Engine(dotenv.parse)
-it splits the raw text data line by line.
-it evaluates each line using regular expressions to match the standard format(KEY=VALUE).
-Strip comments & Whitespaces : it automatically discards any lines starting with a hash symbol or strip leading/trailing whitespace.
-Type conversion : converts everything into string

3. Environment Injection(process.env)
-it takes every successfully parsed key-value pair and writes them directly into node.js global object - process.env.
-->

now change {const PORT = 5000} to {const PORT = process.env.PORT || 5000;}
<!-- process.env.PORT checks if a port has been defined in your environment variables(either from your .env file using dotenv or it could be automatically provided by hosting provider like Heroku , Render or AWS) -->




