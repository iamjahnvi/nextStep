import {useState} from "react";

function Signup(){
    const[formData , setFormData] = useState({
        name : "",
        email : "" ,
        password : "" ,
        confirmPassword: ""
    });

    const handleChange = (e) => {
        // e - event
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // normally when a form is submitted , the browser refreshes the page., ubt we don;t want that to happen , so we stop the default browser behaviour.

        console.log(formData);

        if(formData.confirmPassword!==formData.password){
            alert("Passwords do not match");
            return ;
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <h1>Create Account</h1>

            <input type="text" name="name" placeholder="Enter your name" value={formData.name} onChange={handleChange}/>

            <input type="text" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange}/>

            <input type="text" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange}/>

            <input type="text" name="confirmPassword" placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleChange}/>

            <button>Create Account</button>
            <button type="submit">Create Account</button>
        </form>
    );
}


export default Signup;