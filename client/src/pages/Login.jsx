import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import PasswordInput from "../components/PasswordInput";
import "./Login.css";

const PROMO_CHIPS = ["JEE", "NEET", "CUET", "CLAT", "+40 more"];

function BrandMark() {
    return (
        <svg width="28" height="28" viewBox="0 0 30 30" aria-hidden="true">
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

function GoogleIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path
                fill="#4285F4"
                d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.88 2.7-6.62z"
            />
            <path
                fill="#34A853"
                d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.98v2.33A9 9 0 0 0 9 18z"
            />
            <path
                fill="#FBBC05"
                d="M3.95 10.7A5.4 5.4 0 0 1 3.67 9c0-.59.1-1.17.28-1.7V4.97H.98A9 9 0 0 0 0 9c0 1.45.35 2.83.98 4.03l2.97-2.33z"
            />
            <path
                fill="#EA4335"
                d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .98 4.97l2.97 2.33C4.66 5.17 6.65 3.58 9 3.58z"
            />
        </svg>
    );
}

function PromoBackground() {
    return (
        <svg className="login-bg-deco" viewBox="0 0 700 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <path
                d="M540 40 L470 40 L470 220 L540 220"
                fill="none"
                stroke="rgba(226,154,52,0.16)"
                strokeWidth="26"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M660 60 L730 60 L730 240 L660 240"
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="26"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <circle cx="560" cy="560" r="150" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
            <circle
                cx="560"
                cy="560"
                r="118"
                fill="none"
                stroke="rgba(226,154,52,0.14)"
                strokeWidth="2"
                strokeDasharray="3 7"
            />
            <circle cx="560" cy="560" r="90" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" />
            <g transform="translate(180,620)">
                <path
                    d="M0 -46 L28 -14 L11 -14 L11 46 L-11 46 L-11 -14 L-28 -14 Z"
                    fill="rgba(226,154,52,0.10)"
                    transform="rotate(0)"
                />
                <path
                    d="M0 -46 L28 -14 L11 -14 L11 46 L-11 46 L-11 -14 L-28 -14 Z"
                    fill="rgba(255,255,255,0.05)"
                    transform="rotate(72)"
                />
                <path
                    d="M0 -46 L28 -14 L11 -14 L11 46 L-11 46 L-11 -14 L-28 -14 Z"
                    fill="rgba(226,154,52,0.10)"
                    transform="rotate(144)"
                />
                <path
                    d="M0 -46 L28 -14 L11 -14 L11 46 L-11 46 L-11 -14 L-28 -14 Z"
                    fill="rgba(255,255,255,0.05)"
                    transform="rotate(216)"
                />
                <path
                    d="M0 -46 L28 -14 L11 -14 L11 46 L-11 46 L-11 -14 L-28 -14 Z"
                    fill="rgba(226,154,52,0.10)"
                    transform="rotate(288)"
                />
            </g>
        </svg>
    );
}

function Login() {
    const navigate = useNavigate();
    const [rememberMe, setRememberMe] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/auth/login", formData);
            if (response.data.success) {
                localStorage.setItem("token", response.data.token);
            }
            alert(response.data.message);
            navigate("/profile");
        } catch (error) {
            alert(error.response?.data?.message);
        }
    };

    return (
        <div className="login-page">
            <div className="login-layout">
                <div className="login-panel-left">
                    <button
                        type="button"
                        className="login-brand"
                        onClick={() => navigate("/")}
                    >
                        <BrandMark />
                        NextStep
                    </button>

                    <div className="login-form-wrap">
                        <h1 className="login-title">Log in to your account</h1>
                        <p className="login-signup-line">
                            Don&apos;t have an account?{" "}
                            <button
                                type="button"
                                className="login-signup-line__link"
                                onClick={() => navigate("/signup")}
                            >
                                Sign up
                            </button>
                        </p>

                        <button type="button" className="login-oauth-btn" disabled>
                            <GoogleIcon />
                            Continue with Google
                        </button>

                        <div className="login-divider">
                            <span className="login-mono">OR WITH EMAIL AND PASSWORD</span>
                        </div>

                        <form onSubmit={handleSubmit} autoComplete="off">
                            <div className="login-field">
                                <label className="login-mono" htmlFor="email">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    autoComplete="off"
                                    required
                                />
                            </div>

                            <div className="login-field">
                                <label className="login-mono" htmlFor="password">
                                    Password
                                </label>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    autoComplete="current-password"
                                    required
                                />
                            </div>

                            <div className="login-row-between">
                                <label className="login-remember">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                    />
                                    Remember me
                                </label>
                                <button type="button" className="login-forgot">
                                    Forgot password?
                                </button>
                            </div>

                            <button type="submit" className="login-btn-primary">
                                Log in
                            </button>
                        </form>

                        <p className="login-foot-note">
                            By continuing, you agree to NextStep&apos;s Terms of Service and Privacy
                            Policy.
                        </p>
                    </div>
                </div>

                <div className="login-panel-right">
                    <PromoBackground />

                    <div className="login-promo">
                        <h2>Every exam window, tracked automatically.</h2>
                        <p>
                            Once you&apos;re in, NextStep watches application deadlines for every exam
                            you qualify for and tells you before they close.
                        </p>
                        <div className="login-promo-code login-mono">
                            JOIN500 — first 500 sign-ups get early access
                        </div>
                        <button
                            type="button"
                            className="login-browse"
                            onClick={() => navigate("/")}
                        >
                            Browse supported exams →
                        </button>

                        <div className="login-promo-cards">
                            {PROMO_CHIPS.map((chip) => (
                                <span key={chip} className="login-mini-chip login-mono">
                                    {chip}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
