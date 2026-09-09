import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import MainDashboard from "../pages/MainDashboard";
import "./ExamDetails.css";

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
        <div className="exam-details-page">
            <div className="exam-details-layout">
                <div className="exam-details-left">
                    <div className="profile-sidebar">
                        <div className="profile-sidebar__image">
                            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"/>
                                <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                                <line x1="9" y1="9" x2="9.01" y2="9"/>
                                <line x1="15" y1="9" x2="15.01" y2="9"/>
                                <line x1="9" y1="15" x2="9.01" y2="15"/>
                                <line x1="15" y1="15" x2="15.01" y2="15"/>
                            </svg>
                            <span className="profile-sidebar__initial">U</span>
                        </div>
                        <div className="profile-sidebar__info">
                            <p className="profile-sidebar__name">User Name</p>
                            <p className="profile-sidebar__email">user@example.com</p>
                        </div>
                        <div className="profile-sidebar__filters">
                            <button type="button" className="profile-sidebar__filter">
                                Career Type
                            </button>
                            <button type="button" className="profile-sidebar__filter">
                                Month
                            </button>
                            <button type="button" className="profile-sidebar__filter">
                                Stream
                            </button>
                            <button type="button" className="profile-sidebar__filter">
                                Location
                            </button>
                        </div>
                    </div>
                </div>

                <div className="exam-details-right">
                    <div className="exam-header">
                        <h1 className="exam-header__name">{exam.name}</h1>
                        <p className="exam-header__fullform">{exam.fullForm}</p>
                    </div>

                    <div className="exam-eligibility">
                        <h2 className="exam-eligibility__title">Eligibility Criteria</h2>
                        <div className="exam-eligibility__grid">
                            <div className="exam-eligibility__item">
                                <span className="exam-eligibility__label">Stream</span>
                                <span className="exam-eligibility__value">
                                    {exam.streams ? exam.streams.join(" · ") : "Not specified"}
                                </span>
                            </div>
                            <div className="exam-eligibility__item">
                                <span className="exam-eligibility__label">Minimum Education</span>
                                <span className="exam-eligibility__value">
                                    {exam.minimumEducationLevel}
                                </span>
                            </div>
                            <div className="exam-eligibility__item">
                                <span className="exam-eligibility__label">Minimum Percentage</span>
                                <span className="exam-eligibility__value">
                                    {exam.eligibility?.minimumPercentage ?? "Not specified"}%
                                </span>
                            </div>
                            <div className="exam-eligibility__item">
                                <span className="exam-eligibility__label">Subjects</span>
                                <span className="exam-eligibility__value">
                                    {exam.subjects ? exam.subjects.join(", ") : "Not specified"}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="exam-registration">
                        <h2 className="exam-registration__title">Registration Details</h2>
                        <div className="exam-registration__grid">
                            <div className="exam-registration__item">
                                <span className="exam-registration__label">Start Date</span>
                                <span className="exam-registration__value">
                                    {formatDate(exam.registrationStartDate)}
                                </span>
                            </div>
                            <div className="exam-registration__item">
                                <span className="exam-registration__label">End Date</span>
                                <span className="exam-registration__value">
                                    {formatDate(exam.registrationEndDate)}
                                </span>
                            </div>
                        </div>
                        <div className="exam-registration__status">
                            <span className="exam-registration__status-label">Status</span>
                            <span className="exam-registration__status-value">
                                {getRegistrationStatus(exam.registrationStartDate, exam.registrationEndDate)}
                            </span>
                        </div>
                    </div>

                    <div className="exam-actions">
                        <a
                            href={exam.officialWebsite}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="exam-actions__website">
                            Visit official website
                        </a>
                        <button
                            onClick={() => navigate("/recommendations")}
                            className="exam-actions__back">
                            Back to recommendations
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExamDetails;