import {useState} from "react";
import {useNavigate} from "react-router-dom";
import api from "../services/api";


function Profile(){

    const navigate = useNavigate();

    const[formData, setFormData] = useState({
        age : "" ,
        educationLevel : "",
        stream : "" ,
        percentage : "",
        subjects : ""
    })

    const handleChange = (e) => {
       setFormData({
        ...formData ,
        [e.target.name] : e.target.value
       })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const profileData = {
            ...formData,
            subjects: formData.subjects
                .split(",")
                .map(subject => subject.trim())
        };

        try{
            const response = await api.patch("/auth/profile", profileData);
            if(response.data.success){
                alert(response.data.message);
            }
            navigate("/recommendation");
        } catch(error){
            alert(error.response.data.message);
        }


    } 

    return(
        <form onSubmit={handleSubmit}>
            <input type="number" name="age" placeholder="Enter your age" value={formData.age} onChange={handleChange} />

            <input type="text" name="educationLevel" placeholder="Enter your maximum education level" value={formData.educationLevel} onChange={handleChange} />

            <input type="text" name="stream" placeholder="Enter your stream" value={formData.stream} onChange={handleChange} />     

            <input type="number" name="percentage" placeholder="Enter percentage" value={formData.percentage} onChange={handleChange} />    

            <input type="text" name="subjects" placeholder="Enter subjects" value={formData.subjects} onChange={handleChange} />
            
        </form>
    );
    <button type="submit">Save Profile</button>
}