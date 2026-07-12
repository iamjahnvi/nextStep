import { useNavigate } from "react-router-dom";
// importing hook , a hook is simply a special React function
// We import it because we want to move from one page to another.

function Home(){
    const navigate = useNavigate();

    return (
        <div>
            <h1>NextStep</h1>
            <p>
                Find entrance exams you're eligible for based
                on your profile.
            </p>

            <button onClick={() => navigate("/signup")}>Get started</button>

            <button onClick={() => navigate("/login")}>Login</button>

            
        </div>
    )
}
export default Home;