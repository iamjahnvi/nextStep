import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./MainDashboard.css";

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
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const STREAMS = [
    "Science (PCM)",
    "Science (PCB)",
    "Commerce",
    "Arts",
    "Humanities",
];

const LOCATIONS = [
    "All India",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
];

function MainDashboard() {
    const navigate = useNavigate();
    const [careerType, setCareerType] = useState("");
    const [month, setMonth] = useState("");
    const [stream, setStream] = useState("");
    const [location, setLocation] = useState("");
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const formData = {
        careerType,
        month,
        stream,
        location,
    };

    const handleSearch = async () => {
        setLoading(true);
        setError("");
        setExams([]);

        try {
            // In a real app, this would query the backend with the filters
            // For now, we'll simulate based on the inputs
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Simple filtering logic based on user inputs
            const allExams = [
                { name: "JEE Main", career: "Engineering", month: "January", stream: "Science (PCM)", location: "All India" },
                { name: "JEE Advanced", career: "Engineering", month: "May", stream: "Science (PCM)", location: "All India" },
                { name: "NEET UG", career: "Medical", month: "May", stream: "Science (PCB)", location: "All India" },
                { name: "CLAT UG", career: "Law", month: "June", stream: "Arts", location: "All India" },
                { name: "NATA", career: "Design", month: "January", stream: "Science", location: "All India" },
                { name: "IPMAT", career: "Management", month: "March", stream: "Commerce", location: "All India" },
            ];

            let filtered = allExams;

            if (careerType) {
                filtered = filtered.filter((exam) => exam.career === careerType);
            }
            if (month) {
                filtered = filtered.filter((exam) => exam.month === month);
            }
            if (stream) {
                filtered = filtered.filter((exam) => exam.stream === stream);
            }
            if (location) {
                filtered = filtered.filter((exam) => exam.location === location);
            }

            setExams(filtered);
        } catch (err) {
            setError("Failed to search exams. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="main-dashboard-loading">
                <div className="skeleton" style={{ width: "100%", height: "200px" }} />
                <div className="skeleton" style={{ width: "50%", height: "20px" }} />
            </div>
        );
    }

    return (
        <div className="main-dashboard-page">
            <nav className="main-nav">
                <div className="main-brand">
                    <span className="main-brand-mark main-mono">N</span>
                    NextStep
                </div>
                <button
                    type="button"
                    className="main-nav-link main-mono"
                    onClick={() => navigate("/profile-completion")}
                >
                    Edit Profile
                </button>
                <button
                    type="button"
                    className="main-nav-link main-mono"
                    onClick={() => navigate("/login")}
                >
                    Logout
                </button>
            </nav>

            <main className="main-dashboard">
                <div className="hero-filter-area">
                    <div className="hero-content">
                        <div className="hero-eyebrow">Career Discovery</div>
                        <h1 className="hero-title">Find Opportunities That Match You</h1>
                        <p className="hero-sub">
                            Select your career type, exam month, stream, and location to discover
                            exams you're eligible for based on your profile.
                        </p>
                    </div>

                    <div className="filters-card">
                        <form className="filters-form" onSubmit={e => {
                            e.preventDefault();
                            handleSearch();
                        }}>
                            <div className="filter-group">
                                <label className="filter-label">Career Type</label>
                                <select
                                    name="careerType"
                                    value={careerType}
                                    onChange={(e) => setCareerType(e.target.value)}
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

                            <div className="filter-group">
                                <label className="filter-label">Exam Month</label>
                                <select
                                    name="month"
                                    value={month}
                                    onChange={(e) => setMonth(e.target.value)}
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

                            <div className="filter-group">
                                <label className="filter-label">Stream</label>
                                <select
                                    name="stream"
                                    value={stream}
                                    onChange={(e) => setStream(e.target.value)}
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

                            <div className="filter-group">
                                <label className="filter-label">Location</label>
                                <select
                                    name="location"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    required
                                >
                                    <option value="">All locations</option>
                                    {LOCATIONS.map((loc) => (
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
                </div>

                {error && (
                    <div className="error-banner">
                        <p>{error}</p>
                    </div>
                )}

                {/* Quick-access categories */}
                <div className="quick-categories">
                    <h3 className="quick-categories__title">Quick Access</h3>
                    <div className="quick-categories__grid">
                        <span className="quick-category">Engineering</span>
                        <span className="quick-category">Medical</span>
                        <span className="quick-category">Law</span>
                        <span className="quick-category">Design</span>
                        <span className="quick-category">Management</span>
                        <span className="quick-category">Commerce</span>
                    </div>
                </div>

                {exams && exams.length > 0 && (
                    <div className="exam-results">
                        <h2 className="results-heading">Find Opportunities That Match You</h2>
                        <p className="results-sub">
                            Based on your selections, here are the exams you're eligible for:
                        </p>
                        <div className="exam-categories">
                            {exams.map((exam) => (
                                <div key={exam.name} className="exam-card">
                                    <div className="exam-card__header">
                                        <h3 className="exam-card__title">{exam.name}</h3>
                                    </div>
                                    <div className="exam-card__meta">
                                        <span className="exam-card__career">{exam.career}</span>
                                        <span className="exam-card__month">{exam.month}</span>
                                        <span className="exam-card__stream">{exam.stream}</span>
                                        <span className="exam-card__location">{exam.location}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {!(exams && exams.length > 0) && (
                    <div className="no-results">
                        <p>No exams match your criteria. Try adjusting your filters.</p>
                    </div>
                )}
            </main>
        </div>
    );
}

export default MainDashboard;