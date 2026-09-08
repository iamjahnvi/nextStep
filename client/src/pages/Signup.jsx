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

// -----------------------------------------------------------------------------
// CLIENT-SIDE VALIDATION HELPERS (shared regexes, mirrored on the server)
// HOW: Each helper returns either an empty string (valid) or an error message,
//   so we can show precise inline feedback next to each field.
// WHY: Validating on the client gives instant feedback without a network round
//   trip, while the SAME rules run again on the server for security.
// -----------------------------------------------------------------------------

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// HOW: Name must be letters only (space/hyphen/apostrophe allowed for real
//   compound names). WHY: flag entries that are numbers or symbols.
const NAME_REGEX = /^[A-Za-z]+(?:['\-\s][A-Za-z]+)*$/;

// validateField: returns an error string, or "" when valid
const validateField = (value, type) => {
    switch (type) {
        case "name":
            if (!value.trim()) return "Name is required.";
            if (!NAME_REGEX.test(value.trim())) {
                return "Name must only contain letters (A-Z). Numbers and special characters are not allowed.";
            }
            return "";
        case "email":
            if (!value.trim()) return "Email is required.";
            if (!EMAIL_REGEX.test(value.trim())) {
                return "Please enter a valid email address (e.g. you@example.com).";
            }
            return "";
        case "password":
            if (!value) return "Password is required.";
            if (value.length < 8) return "Password must be at least 8 characters long.";
            if (!/[A-Za-z]/.test(value)) return "Password must contain at least one letter (A-Z or a-z).";
            if (!/\d/.test(value)) return "Password must contain at least one number (0-9).";
            if (!/[^A-Za-z0-9]/.test(value)) return "Password must contain at least one special character (e.g. !@#$%^&*).";
            return "";
        case "confirmPassword":
            return "";
        default:
            return "";
    }
};

function Signup() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    // errors is a map of fieldName -> inline error message ("" means valid)
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // HOw: validate live as the user types and clear/report the field error,
        //   plus auto-check confirm-password match whenever either password changes.
        // WHY: Instant feedback improves UX and prevents surprise on submit.
        if (name === "confirmPassword" || name === "password") {
            let confirmError = "";
            // compare the newly-typed value against the other password field
            const otherValue = name === "password" ? formData.confirmPassword : formData.password;
            if (otherValue && value && value !== otherValue) {
                confirmError = "Passwords don't match.";
            }
            setErrors((prev) => ({
                ...prev,
                [name]: validateField(value, name),
                confirmPassword: confirmError,
            }));
            return;
        }

        setErrors((prev) => ({ ...prev, [name]: validateField(value, name) }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // ---------------------------------------------------------------------
        // Run ALL validations at submit time.
        // HOW: We re-validate every field and the password/confirm match, then
        //   if anything is invalid we stop and surface the inline errors.
        // WHY: This replaces the old alert()-based checks with a proper, visible
        //   validation state next to each input.
        // ---------------------------------------------------------------------
        const nextErrors = {
            name: validateField(formData.name, "name"),
            email: validateField(formData.email, "email"),
            password: validateField(formData.password, "password"),
            confirmPassword: "",
        };

        // confirm-password match check on top of individual field validation
        if (formData.confirmPassword !== formData.password) {
            nextErrors.confirmPassword = "Passwords don't match.";
        }

        setErrors(nextErrors);

        // stop submission if any field is invalid
        if (Object.values(nextErrors).some((message) => message !== "")) {
            return;
        }

        try {
            const response = await api.post("/auth/signup", formData);
            if (response.data.success) {
                // WHY: the original alert() is removed; success is communicated
                //   purely by redirecting to the login page.
                navigate("/login");
            }
        } catch (error) {
            // WHY: replaced alert() with inline error display for clarity/UX.
            const serverMessage =
                error.response?.data?.message ||
                error.response?.data?.errors?.email ||
                error.response?.data?.errors?.password ||
                error.response?.data?.errors?.name ||
                error.message ||
                "Signup failed";

            setErrors((prev) => ({
                ...prev,
                email: error.response?.data?.errors?.email || "",
                password: error.response?.data?.errors?.password || "",
                name: error.response?.data?.errors?.name || "",
                _form: serverMessage,
            }));
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
                            {errors._form && (
                                <div className="signup-form-error">{errors._form}</div>
                            )}

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
                                {errors.name && (
                                    <p className="signup-field__error">{errors.name}</p>
                                )}
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
                                {errors.email && (
                                    <p className="signup-field__error">{errors.email}</p>
                                )}
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
                                    hint="Min 8 chars with letters, numbers and a special character"
                                    minLength={8}
                                    required
                                />
                                {errors.password && (
                                    <p className="signup-field__error">{errors.password}</p>
                                )}
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
                                {errors.confirmPassword && (
                                    <p className="signup-field__error">{errors.confirmPassword}</p>
                                )}
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
