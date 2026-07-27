<!-- while making this project, we followed these steps -


SPRINT-0

1.first make the following folders :-
-client : react frontend
-server : express backend
-assests : ER diagrams, architecture design etc
-docs - documenting project info(if u want)


2.then we added files to doc
docs/
│
├── project-overview.md
├── requirements.md
├── database-design.md
├── api-design.md
├── ui-pages.md
└── roadmap.md

3.Defined the MVP:-
Landing Page
Signup/Login
Student Profile
Recommendation Engine
Eligible Exams
Exam Details
Bookmarks
Search
Filters

4.Defined the user flow :-

Landing Page
      │
      ▼
Signup/Login
      │
      ▼
Complete Profile
      │
      ▼
Recommendation Engine
      │
      ▼
Eligible Exams
      │
      ▼
Exam Details
      │
      ▼
Official Website

5.Decide the pages :-
LandingPage

LoginPage

SignupPage

ProfilePage

EligibleExamsPage

ExamDetailsPage

<!-- Bookmarks Page -->

6. Main entities of a project(think like a database eng.)
-User :-

Name
Email
Password
Age
Class
Qualification
Stream
Subjects


-Exams :- 

Name
Full Form
Description
Conducting Body
Eligibility
Registration Status
Registration Dates
Official Website
Exam Pattern
Streams
Subjects
Minimum Qualification

-Bookmark :-
User ID
Exam ID

6.Recommendation Logic

IF
Qualification = Class 12
AND
Stream = Science
AND
Subjects contain Mathematics

THEN
Recommend
JEE Main
JEE Advanced
BITSAT
VITEEE

7. Frontend routes

/
/login
/signup
/dashboard
/profile
/exams
/exams/:slug
/bookmarks

8. Backend APIs 

-authentication:-

POST /api/auth/signup
POST /api/auth/login

-user 
GET /api/users/profile
PUT /api/users/profile

-exams
GET /api/exams
GET /api/exams/recommendations


--------------------------------------------------------

SPRINT-1

1.installations :-
-install node
-create the react app(install react+vite)
-create backend(install express)
-install backend packages(npm install mongoose dotenv cors bcrypt jsonwebtoken)

| Package      | Purpose                    |
| ------------ | -------------------------- |
| express      | Server                     |
| mongoose     | MongoDB                    |
| dotenv       | Environment variables      |
| cors         | Connect frontend & backend |
| bcrypt       | Hash passwords             |
| jsonwebtoken | Authentication             |
| nodemon      | Auto restart server        |


2.Create backend structures

inside server , create :-

backend/
config/
controllers/
middleware/
models/
routes/
services/
utils/
seed/

and then create :-

server.js
app.js
.env
.gitignore


3.Update package.json

Change scripts to :

"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
and now run : npm run dev

4.Install frontend stuff

-install tailwind 
: npm install tailwindcss @tailwindcss/vite

-install react packages 
: npm install react-router-dom axios react-hook-form

5.Initilize git and make first commit

----------------------------------------------------------

---FLOW OF CODE
1. create app.js 
-(understand code written in app-js explained.)
2. create server.js
-(understand code written in server-js explained.)
3. create env
-need of env : we store our confidencial data like port number , mongo_url , and jwt_secret , passwords in .env, so that no-one sees them.
-(understand code written fin env-js explained.)
4. MIDDLEWARE : 
-make some changes in app.js 
-(open app.js)
-(add const cors = require("cors") and other lines related to it. )
5. Route Folder 
-inside routes/ , create index.js 
6. visit http://localhost:5000/api/v1
-you should recieve :-
{
    "success": true,
    "message": "Career Compass API v1"
}

-first REST API done

7. install postman

----------------------------------------------------------

SPRINT-2

1. Download database MongoDB Atlas Free Tier
-get the connection string like :-
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/
-store it in MONGO_URI in .env file

2. Mongoose
-why mongoose ? 
becuase node.js doesn't understand MongoDB directly in a convenient way.

3. Database Design:-
-we will create a user model , consisting of name, email id , passowrds , age , etc

4. Connect the Backend to MongoDB by Creating config/db.js.

-why config?
-becuase config is about configuring external services like :-

/database connection
/cloudinary configuration
/email service configuration
/firebase configuration

5. update server.js
-(include startServer thing inside it)

6. create models/User.js

7. create controllers/authController.js
-after this the flow of website will be like this :-

. Client sends POST /api/v1/auth/signup
. Express receives the request.
. Express matches the request with authRoutes.js.
. authRoutes.js forwards the request to signupController().
. signupController extracts:
   - name
   - email
   - password
. Validate the input.
   - Are all fields present?
   - Is the email valid?
   - Is the password strong enough?
. Check if a user with this email already exists.
. Hash the password using bcrypt.
. Create a new User document.

. Save it to MongoDB.

. MongoDB returns the saved document.

. Controller sends a success response (201 Created).
-->

8. create routes/authRoutes.js

9. register this route in routes/index.js

10. create controller/authController.js

11. Test :-
-start the backend  : npm run dev
-open postman
-method : POST
-url : http://localhost:5000/api/v1/auth/signup
-click body -> raw ->  json
-send : 
{
  "name": "Pixie",
  "email": "pixie@gmail.com",
  "password": "Password123!"
}

# key point : till now we were testing if route is working , controller is connected , express is configured correctly , and postman can reach our API , but now we will move forward to actually to reading requested data, validating it , checking dor existing users , and then hashing passwords with bcrypt , and saving the user in MongoDB.

# A mini HTTP cheat sheet for our project
# 200 => Success (fetch/update) / 201 => Created (signup, create bookmark)  / 400 => Bad request (missing fields) /401 => Unauthorized (not logged in) / 403 => Forbidden(no permission) / 404 => Not Found / 409 => conflict (email already exists) / 500 => server error

----------------------------------------------------------

SPRINT - 3

# Signup implementation:-
Read request body
↓
Check if any field is missing
↓
Check if email already exists
↓
Hash password
↓
Create User object
↓
Save User
↓
Return success


1. open authController.js and replace signup placeholder.

2. Test in postman for diff use cases.

# after this , user will be able to log in, backend verifies email and password , and generates jwt token , frontend will later use this token for protected routes.

3. create jwt token 
-open .env 
-add jwt_secret = my_super_secret_key_12345
-add {const jwt = require("jsonwebtoken")} , at the top of authController.js

4. set up route for login in authRoutes.js.

5. write the code for generating jsonwebtoken in utils/generateToken.js

6. create middleware/authMiddleware.js

7. write the business logic related to middleware in controller and set up it's route in authRoutes.js

# TEST IN POSTMAN : copy the token returned by POST /api/v1/auth/login , and then make a new request GET /api/v1/auth/me , after that go to headers and add key - authorization and value - Bearer {token} , and then get response

8. create the exam model.

9. create data/exams.js  , that contains data about exams.

10. create seed.js 
-which will connect to MongoDB
-delete old exam data
-insert fresh exam data

----------------------------------------------------------

SPRINT-4

# COMPLETION OF PROFILE 
# after login , user fills in :- age , education , stream , subjects etc

1. create a new route - routes/profileRoutes.js

2. create controllers/profileController.js

3. 





