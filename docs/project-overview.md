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
-(understand code written in env-js explained.)
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

-----------------------------------------------------------

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



















 -->