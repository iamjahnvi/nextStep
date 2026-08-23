import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import PasswordInput from "../components/PasswordInput";
import "./Signup.css";

const BENEFITS = [
    "A personalized eligibility list, not a generic one",
    "Deadline reminders for every exam you qualify for",
    "Free to use, no spam, cancel anytime",
];

const BARCODE_HEIGHTS = [22, 13, 20, 9, 22, 16, 11];

function BrandMark() {
    return (
        <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true">
            <rect x="1" y="1" width="28" height="28" rx="7" fill="none" stroke="#16233F" strokeWidth="2" />
            <circle cx="1" cy="15" r="3.2" fill="#EDF0F6" />
            <circle cx="29" cy="15" r="3.2" fill="#EDF0F6" />
            <text
                x="15"
                y="20"
                textAnchor="middle"
                fontSize="14"
                fontWeight="700"
                fill="#16233F"
                fontFamily="'IBM Plex Mono', monospace"
            >
                N
            </text>
        </svg>
    );
}

function Signup() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password.length < 8) {
            alert("Password must be at least 8 characters.");
            return;
        }

        if (formData.confirmPassword !== formData.password) {
            alert("Passwords don't match — check and try again.");
            return;
        }

        try {
            const response = await api.post("/auth/signup", formData);
            if (response.data.success) {
                alert(response.data.message);
            }
            navigate("/login");
        } catch (error) {
            console.log("🔥 FULL ERROR:", error);
            console.log("🔥 RESPONSE:", error.response);
            console.log("🔥 RESPONSE DATA:", error.response?.data);
            console.log("🔥 STATUS:", error.response?.status);

            alert(
                error.response?.data?.message ||
                error.response?.data?.error ||
                error.message ||
                "Signup failed"
            );
        }
    };

    return (
        <div className="signup-page">
            <nav className="signup-nav">
                <div className="signup-brand">
                    <BrandMark />
                    NextStep
                </div>
                <button
                    type="button"
                    className="signup-nav-link signup-mono"
                    onClick={() => navigate("/")}
                >
                    ← Back home
                </button>
            </nav>

            <div className="signup-wrap">
                <div className="signup-copy">
                    <div className="signup-eyebrow">Get started</div>
                    <h1 className="signup-title">Create your account, find your exams.</h1>
                    <p className="signup-sub">
                        Takes under a minute. Once you&apos;re in, you&apos;ll fill out your profile and
                        get a matched list of exams — no forms to dig through, no deadlines missed.
                    </p>

                    <div className="signup-benefits">
                        {BENEFITS.map((benefit) => (
                            <div key={benefit} className="signup-benefit">
                                <span className="signup-benefit__tick">✓</span>
                                {benefit}
                            </div>
                        ))}
                    </div>

                    <div className="signup-mini-stamp-row">
                        <div className="signup-mini-stamp signup-mono">
                            PENDING
                            <br />
                            SIGN UP
                        </div>
                        <p>
                            Your eligibility slip — the one on the home page — unlocks right after you
                            create your account.
                        </p>
                    </div>
                </div>

                <div className="signup-card-stage">
                    <form className="signup-form-card" onSubmit={handleSubmit} autoComplete="off">
                        <div className="signup-form-top">
                            <div>
                                <div className="signup-mono signup-form-label">NEW APPLICANT</div>
                                <div className="signup-form-title">Create account</div>
                            </div>
                            <div className="signup-barcode" aria-hidden="true">
                                {BARCODE_HEIGHTS.map((height, index) => (
                                    <span key={index} style={{ height: `${height}px` }} />
                                ))}
                            </div>
                        </div>

                        <div className="signup-form-body">
                            <div className="signup-field">
                                <label className="signup-mono" htmlFor="name">
                                    Full name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    autoComplete="off"
                                    required
                                />
                            </div>

                            <div className="signup-field">
                                <label className="signup-mono" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    autoComplete="off"
                                    required
                                />
                            </div>

                            <div className="signup-field">
                                <label className="signup-mono" htmlFor="password">
                                    Password
                                </label>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    autoComplete="new-password"
                                    hint="Use at least 8 characters"
                                    minLength={8}
                                    required
                                />
                            </div>

                            <div className="signup-field">
                                <label className="signup-mono" htmlFor="confirmPassword">
                                    Confirm password
                                </label>
                                <PasswordInput
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    placeholder="Confirm your password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    autoComplete="new-password"
                                    minLength={8}
                                    required
                                />
                            </div>

                            <button type="submit" className="signup-btn-primary">
                                Create account
                            </button>

                            <p className="signup-form-footer">
                                Already have an account?{" "}
                                <button
                                    type="button"
                                    className="signup-form-footer__link"
                                    onClick={() => navigate("/login")}
                                >
                                    Log in
                                </button>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;
