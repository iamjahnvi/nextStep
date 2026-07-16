import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api"

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
 
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try{
            const response = await api.post(
                "/auth/login" , formData
            )
            if(response.data.success){
                localStorage.setItem("token" , response.data.token);
            }
            alert(response.data.message);
            navigate("/profile");

        } catch(error){
            alert(error.response?.data?.message || "something went wrong");
        }
    
    }
    return ( 
        <form onSubmit={handleSubmit}>
            <input type="email" name="email"placeholder="Enter your email" value={formData.email} onChange= {handleChange}/>

            <input type="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange}/>

             <button type="submit">Login</button>
        </form>
    );
}

export default Login;
