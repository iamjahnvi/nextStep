import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SubjectSelector from "../components/SubjectSelector";
import "./ProfileCompletion.css";

const EDUCATION_LEVELS = ["High School", "Intermediate", "Graduate", "Post Graduate", "Diploma"];
const SUBJECTS = [
    "Physics",
    "Chemistry",
    "Mathematics",
    "Biology",
    "English",
    "Accountancy",
    "Business Studies",
    "Economics",
    "History",
    "Geography",
    "Computer Science",
    "Physical Education",
    "Psychology",
    "Sociology",
];

function ProfileCompletion() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        age: "",
        educationLevel: "",
        percentage: "",
        subjects: [],
    });

    const [errors, setErrors] = useState({
        age: "",
        educationLevel: "",
        percentage: "",
        subjects: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubjectChange = (selected) => {
        setFormData({
            ...formData,
            subjects: selected,
        });
    };

    const handleSubmit = () => {
        const nextErrors = {
            age: formData.age ? "" : "Age is required.",
            educationLevel: formData.educationLevel ? "" : "Educational level is required.",
            percentage: formData.percentage ? "" : "Percentage is required.",
            subjects: formData.subjects.length > 0 ? "" : "At least one subject is required.",
        };
        setErrors(nextErrors);

        if (Object.values(nextErrors).some((msg) => msg !== "")) {
            return;
        }

        navigate("/dashboard");
    };

    return (
        <div className="profile-completion-page">
            <div className="profile-completion-container">
                <div className="profile-completion-left">
                    <div className="profile-image">
                        <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                            <line x1="9" y1="9" x2="9.01" y2="9"/>
                            <line x1="15" y1="9" x2="15.01" y2="9"/>
                            <line x1="9" y1="15" x2="9.01" y2="15"/>
                            <line x1="15" y1="15" x2="15.01" y2="15"/>
                        </svg>
                        <span className="profile-image__initial">U</span>
                    </div>
                    <div className="profile-info">
                        <p className="profile-info__label">Complete your profile for personalised information</p>
                        <p className="profile-info__subtitle">Help us show you the right exams</p>
                    </div>
                </div>

                <div className="profile-completion-right">
                    <form className="profile-form" onSubmit={handleSubmit}>
                        {errors.age && <p className="form-error">{errors.age}</p>}
                        {errors.educationLevel && <p className="form-error">{errors.educationLevel}</p>}
                        {errors.percentage && <p className="form-error">{errors.percentage}</p>}
                        {errors.subjects && <p className="form-error">{errors.subjects}</p>}

                        <div className="form-group">
                            <label className="form-label">Age</label>
                            <input
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                placeholder="e.g. 17"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Educational Level</label>
                            <select
                                name="educationLevel"
                                value={formData.educationLevel}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select educational level</option>
                                {EDUCATION_LEVELS.map((level) => (
                                    <option key={level} value={level}>
                                        {level}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Percentage</label>
                            <input
                                type="number"
                                name="percentage"
                                value={formData.percentage}
                                onChange={handleChange}
                                placeholder="e.g. 85"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Subjects</label>
                            <SubjectSelector
                                selected={formData.subjects}
                                onChange={handleSubjectChange}
                            />
                        </div>

                        <button type="submit" className="submit-btn">
                            Complete Profile
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ProfileCompletion;