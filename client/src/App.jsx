import{BrowserRouter , Routes , Route } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Recommendations from "./pages/Recommendations";
import ExamDetails from "./pages/ExamDetails";

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
        <Route path="/exams/:id" element={<ExamDetails />}></Route>
        <Route path="/recommendations" element={<Recommendations />}></Route>
      </Routes>
      </BrowserRouter>
  ) ;
}

export default App;

// https://www.instagram.com/p/DbcegXIP7YW/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==