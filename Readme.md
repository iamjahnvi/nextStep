# NextStep

NextStep is a personalized exam discovery platform that helps students find competitive exams and opportunities based on their academic profile and eligibility.

## Features

- User authentication with signup and login
- Student profile creation
- Personalized exam recommendations based on eligibility
- Exam details and eligibility information
- Profile-based recommendation filtering
- REST API-based communication between frontend and backend

## Tech Stack

- React
- JavaScript
- Node.js
- Express.js
- MongoDB
- Mongoose
- Axios
- Vite

## Project Structure

```text
nextstep/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── ...
│   └── ...
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── ...
│
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/iamjahnvi/nextstep.git
cd nextstep
```

#### 2. Install dependencies

Install the dependencies for both the frontend and backend.

```bash
cd backend
npm install
```

```bash
cd ../frontend
npm install
```

#### 3. Configure environment variables

Create a `.env` file in the backend directory and add the required configuration:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Add any other environment variables required by the project.

Do not commit environment files or sensitive credentials to the repository.

#### 4. Start the backend

```bash
cd backend
npm run dev
```

#### 5. Start the frontend

Open a new terminal:

```bash
cd frontend
npm run dev
```

The frontend will be available at the local development URL provided by Vite.

## How It Works

The application collects information about a student's academic background and uses the profile data to determine which exams they may be eligible for.

The general flow is:

```text
Student
   ↓
Create Profile
   ↓
Academic Information
   ↓
Eligibility Matching
   ↓
Personalized Recommendations
   ↓
Exam Details
```

The frontend communicates with the Express.js backend through REST APIs. The backend handles authentication, profile data, recommendation logic, and communication with MongoDB.

## Recommendation System

The recommendation system uses information from the student's profile, including:

- Age
- Education level
- Academic stream
- Percentage
- Subjects

This information is used to filter exams according to their eligibility requirements and return relevant recommendations.

## Future Improvements

- Expand the exam database
- Add more detailed eligibility criteria
- Add exam deadlines and application links
- Improve recommendation accuracy
- Add search and filtering
- Add saved exams and bookmarks
- Add notifications for upcoming application deadlines
- Improve the user interface and mobile experience

## Project Status

NextStep is an ongoing project and is being developed as a practical exploration of full-stack web development and personalized recommendation systems.

## Author

Jahnvi

[GitHub](https://github.com/iamjahnvi) · [LinkedIn](https://www.linkedin.com/in/jahnvi-11a189358/)
