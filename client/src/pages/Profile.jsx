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
    const [errors, setErrors] = useState({
        percentage: "",
        _form: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // live validate the percentage field as the user types.
        // HOW: check for negative numbers and out-of-range (>100) values.
        // WHY: a negative percentage is physically impossible and would corrupt
        //   the eligibility comparison, so we surface it immediately.
        if (name === "percentage") {
            let error = "";
            if (value !== "" && Number(value) < 0) {
                error = "Percentage cannot be a negative number.";
            } else if (value !== "" && Number(value) > 100) {
                error = "Percentage cannot be greater than 100.";
            }
            setErrors((prev) => ({ ...prev, percentage: error }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // ---------------------------------------------------------------------
        // Percentage validation on submit (non-negative + <= 100).
        // HOW: block the request if the percentage is negative or out of range
        //   BEFORE it is sent to the server.
        // WHY: guarantees the profile sent to the backend is always sane, and
        //   gives instant inline feedback instead of an alert().
        // ---------------------------------------------------------------------
        const nextErrors = { percentage: "", _form: "" };
        if (formData.percentage !== "") {
            if (Number(formData.percentage) < 0) {
                nextErrors.percentage = "Percentage cannot be a negative number.";
            } else if (Number(formData.percentage) > 100) {
                nextErrors.percentage = "Percentage cannot be greater than 100.";
            }
        }
        setErrors(nextErrors);
        if (nextErrors.percentage) {
            return;
        }

        const profileData = {
            ...formData,
            subjects,
        };

        try {
            const response = await api.patch("/auth/profile", profileData);

            if (response.data.success) {
                // WHY: the original alert()/console.log is removed; success is
                //   communicated by navigating to the recommendations page.
                navigate("/recommendations");
            }
        } catch (error) {
            // WHY: replaced alert() with an inline error banner.
            setErrors((prev) => ({
                ...prev,
                _form: error.response?.data?.message || "Failed to save profile. Please try again.",
            }));
        }
    };

    return (
        <form onSubmit={handleSubmit} autoComplete="off">
            {errors._form && <div className="profile-form-error">{errors._form}</div>}

            <label className="field-label" htmlFor="educationLevel">
                Maximum Education Level
            </label>
            <select
                id="educationLevel"
                name="educationLevel"
                value={formData.educationLevel}
                onChange={handleChange}
                autoComplete="off"
                required
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
                required
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
                min="0"
                max="100"
                step="any"
                value={formData.percentage}
                onChange={handleChange}
                autoComplete="off"
                required
            />
            {errors.percentage && <p className="profile-field__error">{errors.percentage}</p>}

            <SubjectSelector selected={subjects} onChange={setSubjects} />

            <button type="submit">Save Profile</button>
        </form>
    );
}

export default Profile;
