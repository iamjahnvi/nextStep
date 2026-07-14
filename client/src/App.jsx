import{BrowserRouter , Routes , Route } from "react-router-dom";

import Home from "./pages/Home";
import Home from "./pages/ExamDetails";
import Home from "./pages/Login";
import Home from "./pages/Profile";
import Home from "./pages/Recommendations";
import Home from "./pages/Signup";
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
        <Route path="/exam/:id" element={<ExamDetails />}></Route>
        <Route path="/recommendations" element={<Recommendations />}></Route>
      </Routes>
      </BrowserRouter>
  ) ;
}

export default App;

