import { useParams } from "react-router-dom";

// useParams is a hook from react-router-dom , that allows the component i.e ExamDetails.jsx to access dynamic segments of the URL
// for eg : if ur route is /exam/:id , then useParams will give us the value of id.

import { useEffect, useState } from "react";

import api from "../services/api";


function ExamDetails() {

    const { id } = useParams();
    // useParams extracts the dyanmic value from the url 

    const[exam , setExam] = useState(null);

    useEffect(() => {

        // the useEffect runs whenever the id changes.
        // this is important , because if the  user navigates from one exam page to another , the component needs to re-fetch the data and new ID.

        const fetchExam = async () => {
            try{
                const response = await api.get(`/exams/${id}`)
                if(response.data.success){
                    setExam(response.data.data);
                }
            } catch (error){
            alert(error.response?.data?.message || error);
            }
        } ;

        fetchExam();
        // calling the fuction 

    } ,  [id]);
    // this dependency array will fetch id whenever url changes.

    if(!exam){
        return <h2>Loading...</h2>
    }

    return(
        <div>
            <h1>exam.name</h1>
            <p>exam.fullForm</p>
            <p>exam.description</p>

            <p>Minimum Age : {exam.minimumAge}</p>

            <p>Stream : {exam.streams?.join(" , "
            )}</p>

            <p>Registration Status : {exam.registrationStatus}</p>

            <button onClick = {() => 
                window.open(exam.officialWebsite , "_blank")}>Visit official website</button>
        </div>
    )

}

export default ExamDetails;
