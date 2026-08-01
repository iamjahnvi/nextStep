import { useParams , useNavigate } from "react-router-dom";

// useParams is a hook from react-router-dom , that allows the component i.e ExamDetails.jsx to access dynamic segments of the URL
// for eg : if ur route is /exam/:id , then useParams will give us the value of id.

import { useEffect, useState } from "react";

import api from "../services/api";

function ExamDetails() {

    const navigate = useNavigate();

    const { id } = useParams();
    // useParams extracts the dyanmic value from the url 

    const[exam , setExam] = useState(null);

    const getRegistrationStatus = (start , end ) => {
        const today = new Date();
        if(today < new Date(start)) return "Upcoming" ;
        if(today >= new Date(end)) return "Open"   ;
        return "Closed"; 
    }

    useEffect(() => {

        // the useEffect runs whenever the id changes.
        // this is important , because if the  user navigates from one exam page to another , the component needs to re-fetch the data and new ID.

        const fetchExam = async () => {
            try{
                const response = await api.get(`/exams/${id}`);
                console.log(response.data.data);
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
            <h1>{exam.name}</h1>
            <p>{exam.fullForm}</p>
            <p>{exam.description}</p>

            <h3>Eligibility</h3>

            <p>Minimum Age : {exam.minimumAge ?? "No age limit"}</p>

            <p>Stream : {exam.streams?.join(" , "
            )}</p>

            <p>Minimum Education Level : {exam.minimumEducationLevel}</p>

            <p>Minimum Percentage : {exam.eligibility?.minimumPercentage ?? "Not specified"}%</p>

            <p>Subjects : {exam.subjects?.join(",")}</p>

            <button onClick={() => {
                window.open(exam.officialWebsite,"_blank")
            }}>
                Visit officialWebsite
            </button>

            <hr />

            <h2>Registration Details </h2>

            <p>
                <strong>Start Date : </strong>{" "}
                {new Date(exam.registrationStartDate).toLocaleDateString("en-IN" , {
                    day : "numeric" ,
                    month : "long" ,
                    year : "numeric",
                })}
            </p>

            <p>
                <strong>End Date : </strong>{" "}
                {new Date(exam.registrationEndDate).toLocaleDateString()};
            </p>

            {/* {""} = inserts a forced blank space between the bold label and the date value so that they don't run together on the screen */}

            {/* new Date(...) = converts the raw data into proper js Date Object */}

            {/* strong = making text appear bold */}


            <p>
                <strong>Registration Status</strong>{" "}
                {getRegistrationStatus(exam.registrationStartDate , exam.registrationEndDate)}
            </p>

            <button onClick={()=> navigate("/recommendations")}>Back to recommendations</button>
        </div>
    )

}

export default ExamDetails;
