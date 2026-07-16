import {useState} from "react";
import {useNavigate} from "react-router-dom";
import api from "../services/api";

function Signup(){
    const navigate = useNavigate();
    
    const[formData , setFormData] = useState({
        name : "",
        email : "" ,
        password : "" ,
        confirmPassword: ""
    });

    const handleChange =(e) => {
        // e - event
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // normally when a form is submitted , the browser refreshes the page., but we don;t want that to happen , so we stop the default browser behaviour.


        if(formData.confirmPassword!==formData.password){
            alert("Passwords do not match");
            return ;
        }

        try{
            const response = await api.post(
                "/auth/signup" , formData);
                if(response.data.success){
                    alert(response.data.message);
                }
                navigate("/login");
        } catch (error) {
            alert(error.response?.data?.message || "somewthing went wrong");


            // we could hv written alert(error.response.data.message) but we wrote this becuase maybe server is down in that case something has to be displayed due to which we wrote it.

            // ?. = optional chaining which means it this exists continue , if it doesn;t exist, stop and return undefined instead of crashing.
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <h1>Create Account</h1>

            <input type="text" name="name" placeholder="Enter your name" value={formData.name} onChange={handleChange}/>

            <input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange}/>

            <input type="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange}/>

            <input type="password" name="confirmPassword" placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleChange}/>

            <button type="submit">Create Account</button>
        </form>
    );
}


export default Signup;