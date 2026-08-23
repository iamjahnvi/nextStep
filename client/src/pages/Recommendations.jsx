import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Recommendations.css";

function formatOpeningIn(days) {
    if (days > 30) {
        const months = Math.round(days / 30);
        return `Opening in ~${months} month${months === 1 ? "" : "s"}`;
    }
    return `Opening in ${days} day${days === 1 ? "" : "s"}`;
}

function getUrgencySortKey(exam) {
    if (exam.status === "Opening Soon") {
        return exam.openingIn ?? Number.MAX_SAFE_INTEGER;
    }
    if (exam.status === "Open") {
        return 0;
    }
    return Number.MAX_SAFE_INTEGER;
}

function Recommendations() {
    const [exams, setExams] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const response = await api.get("exams/recommend");
                console.log("recommended exams response : "  , response.data);
                setExams(response.data.data || []);
            } catch (error) {
                alert(error.response?.data?.message );
            }
        };

        fetchRecommendations();
    }, []);

    const sortedExams = useMemo(() => {
        return [...exams].sort((a, b) => {
            const urgencyDiff = getUrgencySortKey(a) - getUrgencySortKey(b);
            if (urgencyDiff !== 0) {
                return urgencyDiff;
            }

            if (a.status === "Open" && b.status === "Open") {
                return (a.closingIn ?? Number.MAX_SAFE_INTEGER) - (b.closingIn ?? Number.MAX_SAFE_INTEGER);
            }

            return a.name.localeCompare(b.name);
        });
    }, [exams]);

    return (
        <div className="recommendations-page">
            <h1>Recommended Exams</h1>
            <div className="recommendations-list">
                {sortedExams.map((exam) => (
                    <article key={exam._id} className="exam-card">
                        <div className="exam-card__header">
                            <h2 className="exam-card__title">{exam.name}</h2>
                            <button
                                type="button"
                                className="exam-card__details-btn"
                                onClick={() => navigate(`/exams/${exam._id}`)}
                            >
                                View Details
                            </button>
                        </div>

                        <div className="exam-card__meta">
                            {exam.status === "Open" && (
                                <>
                                    <span className="exam-card__status">Open</span>
                                    <span className="exam-card__meta-divider" aria-hidden="true">·</span>
                                    <span className="exam-card__timing">
                                        Closes in {exam.closingIn} day{exam.closingIn === 1 ? "" : "s"}
                                    </span>
                                </>
                            )}

                            {exam.status === "Opening Soon" && (
                                <span className="exam-card__timing">
                                    {formatOpeningIn(exam.openingIn)}
                                </span>
                            )}

                            {exam.status === "Closed" && (
                                <span className="exam-card__status">Closed</span>
                            )}
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}

export default Recommendations;
