import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

const DATE_FORMAT = {
    day: "numeric",
    month: "long",
    year: "numeric",
};

function formatDate(dateValue) {
    return new Date(dateValue).toLocaleDateString("en-IN", DATE_FORMAT);
}

function ExamDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [exam, setExam] = useState(null);
    const [error, setError] = useState("");

    const getRegistrationStatus = (start, end) => {
        const today = new Date();
        if (today < new Date(start)) return "Upcoming";
        if (today >= new Date(end)) return "Open";
        return "Closed";
    };

    useEffect(() => {
        const fetchExam = async () => {
            try {
                const response = await api.get(`/exams/${id}`);
                console.log(response.data.data);
                if (response.data.success) {
                    setExam(response.data.data);
                }
            } catch (error) {
                // WHY: removed the original alert() popup; show an inline error instead.
                setError(error.response?.data?.message || "Failed to load exam details.");
            }
        };

        fetchExam();
    }, [id]);

    if (!exam) {
        return (
            <div>
                {error && <p style={{ color: "#b3261e" }}>{error}</p>}
                <h2>Loading...</h2>
            </div>
        );
    }

    return (
        <div>
            <h1>{exam.name}</h1>
            <p>{exam.fullForm}</p>
            <p>{exam.description}</p>

            <h3>Eligibility</h3>

            <p>Stream : {exam.streams?.join(" , ")}</p>

            <p>Minimum Education Level : {exam.minimumEducationLevel}</p>

            <p>Minimum Percentage : {exam.eligibility?.minimumPercentage ?? "Not specified"}%</p>

            <p>Subjects : {exam.subjects?.join(",")}</p>

            <button
                onClick={() => {
                    window.open(exam.officialWebsite, "_blank");
                }}
            >
                Visit officialWebsite
            </button>

            <hr />

            <h2>Registration Details </h2>

            <p>
                <strong>Start Date : </strong>
                {formatDate(exam.registrationStartDate)}
            </p>

            <p>
                <strong>End Date : </strong>
                {formatDate(exam.registrationEndDate)}
            </p>

            <p>
                <strong>Registration Status</strong>{" "}
                {getRegistrationStatus(exam.registrationStartDate, exam.registrationEndDate)}
            </p>

            <button onClick={() => navigate("/recommendations")}>Back to recommendations</button>
        </div>
    );
}

export default ExamDetails;
