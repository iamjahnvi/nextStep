import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import SubjectSelector from "../components/SubjectSelector";
import {
    EDUCATION_LEVEL_OPTIONS,
    STREAM_OPTIONS,
} from "../constants/profileOptions";

function Profile() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        educationLevel: "",
        stream: "",
        percentage: "",
    });
    const [subjects, setSubjects] = useState([]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const profileData = {
            ...formData,
            subjects,
        };

        try {
            const response = await api.patch("/auth/profile", profileData);

            if (response.data.success) {
                console.log(response.data);
            }
            navigate("/recommendations");
        } catch (error) {
            alert(error.response?.data?.message );
        }
    };

    return (
        <form onSubmit={handleSubmit} autoComplete="off">
            <label className="field-label" htmlFor="educationLevel">
                Maximum Education Level
            </label>
            <select
                id="educationLevel"
                name="educationLevel"
                value={formData.educationLevel}
                onChange={handleChange}
                autoComplete="off"
            >
                <option value="">Select education level</option>
                {EDUCATION_LEVEL_OPTIONS.map(({ value, label }) => (
                    <option key={value} value={value}>
                        {label}
                    </option>
                ))}
            </select>

            <label className="field-label" htmlFor="stream">
                Stream
            </label>
            <select
                id="stream"
                name="stream"
                value={formData.stream}
                onChange={handleChange}
                autoComplete="off"
            >
                <option value="">Select stream</option>
                {STREAM_OPTIONS.map((stream) => (
                    <option key={stream} value={stream}>
                        {stream}
                    </option>
                ))}
            </select>

            <label className="field-label" htmlFor="percentage">
                Percentage
            </label>
            <input
                id="percentage"
                type="number"
                name="percentage"
                placeholder="Enter percentage"
                value={formData.percentage}
                onChange={handleChange}
                autoComplete="off"
            />

            <SubjectSelector selected={subjects} onChange={setSubjects} />

            <button type="submit">Save Profile</button>
        </form>
    );
}

export default Profile;
