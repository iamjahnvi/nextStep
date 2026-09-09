import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";
import "./MainPage.css";

const CAREER_TYPES = [
    "Engineering",
    "Medical",
    "Law",
    "Design",
    "Management",
    "Commerce",
    "Sciences",
    "Arts & Humanities",
];

const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const STREAMS = [
    "Science (PCM)", "Science (PCB)", "Commerce", "Arts", "Humanities"
];

const INDIAN_STATES = [
    "All India", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
    "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh",
    "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra",
    "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

function MainPage() {
    const { user, isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    const [filters, setFilters] = useState({
        careerType: "",
        month: "",
        stream: "",
        location: ""
    });

    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error] = useState("");

    useEffect(() => {
        // If user just logged in, check profile completion
        if (isAuthenticated && user) {
            // Profile completeness check
            const profile = user.profile || {};
            const isProfileComplete = 
                profile.age !== undefined && profile.age !== null && profile.age !== "" &&
                profile.educationLevel && profile.educationLevel !== "" &&
                profile.stream && profile.stream !== "" &&
                profile.subjects && profile.subjects.length > 0;
            
            // We don't set state here, just for info; the UI will check
        }
    }, [isAuthenticated, user]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value
        });
    };

    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await api.get("/exams/recommend", {
                params: {
                    careerType: filters.careerType,
                    month: filters.month,
                    stream: filters.stream,
                    location: filters.location
                }
            });
            setExams(response.data.data || []);
        } catch (err) {
            setError("Failed to load exams. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="main-page">
            <div className="main-page-layout">
                {/* LEFT SECTION: User Profile (~30%) */}
                <div className="main-page-left">
                    {isAuthenticated && user ? (
                        <div className="user-profile">
                            <div className="profile-avatar">
                                {user.avatar ? (
                                    <img
                                        src=user.avatar
                                        alt={user.name}
                                        width={80}
                                        height={80}
                                        borderRadius="50%"
                                    />
                                ) : (
                                    <div className="placeholder-avatar">
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                            <circle cx="12" cy="12" r="10"/>
                                            <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                                            <line x1="9" y1="9" x2="9.01" y2="9"/>
                                            <line x1="15" y1="9" x2="15.01" y2="9"/>
                                            <line x1="9" y1="15" x2="9.01" y2="15"/>
                                            <line x1="15" y1="15" x2="15.01" y2="15"/>
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <div className="profile-info">
                                <h3 className="profile-name">{user.name || "User"}</h3>
                                <p className="profile-email">{user.email || ""}</p>
                            </div>
                            {!isProfileComplete && (
                                <div className="profile-completion-prompt">
                                    <p>Complete your profile for personalised information</p>
                                    <button
                                        className="complete-profile-btn"
                                        onClick={() => navigate("/profile")}
                                    >
                                        Complete Profile
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="auth-prompt">
                            <p>Please sign up or log in to personalize your experience</p>
                        </div>
                    )}
                </div>

                {/* RIGHT SECTION: Exam Discovery (~70%) */}
                <div className="main-page-right">
                    <div className="search-filters">
                        <form
                            className="filters-form"
                            onSubmit={e => {
                                e.preventDefault();
                                handleSearch();
                            }}
                        >
                            <div className="filter-row">
                                <label className="filter-label">Career Type</label>
                                <select
                                    name="careerType"
                                    value={filters.careerType}
                                    onChange={handleFilterChange}
                                    required
                                >
                                    <option value="">All career types</option>
                                    {CAREER_TYPES.map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="filter-row">
                                <label className="filter-label">Month</label>
                                <select
                                    name="month"
                                    value={filters.month}
                                    onChange={handleFilterChange}
                                    required
                                >
                                    <option value="">All months</option>
                                    {MONTHS.map((m) => (
                                        <option key={m} value={m}>
                                            {m}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="filter-row">
                                <label className="filter-label">Stream</label>
                                <select
                                    name="stream"
                                    value={filters.stream}
                                    onChange={handleFilterChange}
                                    required
                                >
                                    <option value="">All streams</option>
                                    {STREAMS.map((s) => (
                                        <option key={s} value={s}>
                                            {s}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="filter-row">
                                <label className="filter-label">Location</label>
                                <select
                                    name="location"
                                    value={filters.location}
                                    onChange={handleFilterChange}
                                    required
                                >
                                    <option value="">All locations</option>
                                    {INDIAN_STATES.map((loc) => (
                                        <option key={loc} value={loc}>
                                            {loc}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button type="submit" className="search-btn">
                                {loading ? "Searching..." : "Search Exams"}
                            </button>
                        </form>
                    </div>

                    {error && (
                        <div className="error-banner">
                            <p>{error}</p>
                        </div>
                    )}

                    {exams && exams.length > 0 && (
                        <div className="exam-results">
                            <h2 className="results-heading">Find Opportunities That Match You</h2>
                            <p className="results-desc">
                                NextStep helps you discover exams matching your preferences and eligibility.
                            </p>
                            <div className="exam-list">
                                {exams.map((exam) => (
                                    <div
                                        key={exam._id}
                                        className="exam-item"
                                        onClick={() => navigate(`/exams/${exam._id}`)}
                                    >
                                        <h3 className="exam-item-name">{exam.name}</h3>
                                        <div className="exam-item-meta">
                                            <span className="exam-item-career">{exam.careerType || exam.streams?.[0] || "Exam"}</span>
                                            <span className="exam-item-status{
                                                exam.status === "Open" ? " status-open" :
                                                exam.status === "Closed" ? "status-closed" :
                                                "status-opening"
                                            }">
                                                {exam.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )} {!(exams && exams.length > 0) && (
                        <div className="empty-state">
                            <p>No matching exams found.</p>
                            <p className="empty-state-desc">
                                Try adjusting your filters above to discover new exams.
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MainPage;