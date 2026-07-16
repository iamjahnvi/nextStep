import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Recommendations() {
    // backend returns an array
    const [exams, setExams] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        // this fetchRecommendations thing is a standard pattern for fetching data from an API in react.

        const fetchRecommendations = async () => {
            try {
                const response = await api.get("/recommend");
                setExams(response.data.data || []);
            } catch (error) {
                alert(error.response?.data?.message || "Something went wrong");
            }
        };

        fetchRecommendations();
    }, []);

    return (
        <div>
            <h1>Recommended Exams</h1>
            {
                exams.map((exam) => (
                    <div key = {exam._id}>
                        <h2>{exam.name}</h2>

                        <button onClick={() => navigate(`/exams/${exam._id}`)}>View Details</button>
                    </div>
                ))
            }
        </div>
    )
}

export default Recommendations;

// unlike the codes of login signup , where we had written e for event here , we haven't written it , why?
// because in our useEffect we aren't waiting for a user to do anything , instead the code is designed in a way that it runs after the component has been mounted (rendered) for the first time, which is what the empty dependency array [] does , in the end.
// since there's no longer an interaction that triggers this function, there's is no event to capture , so no e is needed.