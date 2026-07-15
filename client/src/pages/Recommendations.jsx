import {useState , useEffect} from "react";
import { useNavigate} from "react-router-dom";
import api from "../services/api";

function Recommendations() {

    const[exams , setExams] = useState([

    ]);

    

    try{
        const response = await api.get("/recommend");

    } catch(error) {

    }

    return(
        null

    );
    <button></button>
}