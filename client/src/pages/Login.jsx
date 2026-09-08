import { useState, useEffect, useRef } from "react";
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

// -----------------------------------------------------------------------------
// CLIENT-SIDE EMAIL VALIDATION (login)
// HOW: The same regex used in Signup flags a malformed email before the request
//   is sent. WHY: gives instant feedback so users notice a typo immediately.
// -----------------------------------------------------------------------------
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// -----------------------------------------------------------------------------
// GOOGLE OAUTH — "Continue with Google"
// HOW: 1) We fetch the OAuth client ID from our own backend (/auth/google/config)
//         so it lives ONLY on the server.
//      2) We dynamically load Google's official Identity Services script.
//      3) We initialise GIS with the client ID; clicking the button calls
//         google.accounts.id.prompt(), which opens Google's account chooser.
//      4) Google returns a signed ID token (credential) → we POST it to OUR
//         backend /auth/google, where the token is cryptographically VERIFIED,
//         the user is registered/logged-in, and our own JWT is returned.
// WHY:  Backend verification (never trusting the browser) is the secure OAuth
//   pattern, and it works for both signup and login in one click.
// -----------------------------------------------------------------------------
const GOOGLE_SCRIPT_SRC = "https://accounts.google.com/gsi/client";

function Login() {
    const navigate = useNavigate();
    const [rememberMe, setRememberMe] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        email: "",
        _form: "",
    });

    // Google OAuth state
    const [googleReady, setGoogleReady] = useState(false);
    const [googleBusy, setGoogleBusy] = useState(false);
    const gisInitializedRef = useRef(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        // live email validation while typing
        if (e.target.name === "email") {
            const value = e.target.value;
            let error = "";
            if (value && !EMAIL_REGEX.test(value.trim())) {
                error = "Please enter a valid email address (e.g. you@example.com).";
            }
            setErrors((prev) => ({ ...prev, email: error }));
        }
    };

    // Handle the token Google hands back after the account chooser.
    // HOW: send the raw credential to our server; on success store our JWT and
    //   go to the profile page (new users need to fill their profile first).
    const handleGoogleResponse = async (response) => {
        try {
            setGoogleBusy(true);
            const res = await api.post("/auth/google", {
                credential: response.credential,
            });
            if (res.data.success) {
                localStorage.setItem("token", res.data.token);
                navigate("/profile");
            }
        } catch (error) {
            setErrors((prev) => ({
                ...prev,
                _form: error.response?.data?.message || "Google sign-in failed. Please try again.",
            }));
        } finally {
            setGoogleBusy(false);
        }
    };

    const handleGoogleClick = () => {
        if (!googleReady || googleBusy) return;
        setErrors((prev) => ({ ...prev, _form: "" }));
        try {
            // prompt() is called inside the user gesture (the click) so Google
            // shows the account chooser / One Tap popup.
            window.google?.accounts?.id?.prompt();
        } catch {
            setErrors((prev) => ({
                ...prev,
                _form: "Could not open Google sign-in. Make sure popups are allowed.",
            }));
        }
    };

    // On mount: fetch client id, load GIS script, then initialise.
    useEffect(() => {
        let cancelled = false;

        const setupGoogle = async () => {
            try {
                const configRes = await api.get("/auth/google/config");
                const clientId = configRes.data?.clientId;
                if (!clientId || clientId.includes("your_client_id_here")) {
                    if (!cancelled) {
                        setErrors((prev) => ({
                            ...prev,
                            _form: "Google sign-in is not configured yet (GOOGLE_CLIENT_ID missing on the server).",
                        }));
                    }
                    return;
                }

                if (document.getElementById("gsi-client-script")) return;
                const script = document.createElement("script");
                script.id = "gsi-client-script";
                script.src = GOOGLE_SCRIPT_SRC;
                script.async = true;
                script.onload = () => {
                    if (cancelled || gisInitializedRef.current) return;
                    window.google?.accounts?.id?.initialize({
                        client_id: clientId,
                        callback: handleGoogleResponse,
                        auto_select: false,
                    });
                    gisInitializedRef.current = true;
                    if (!cancelled) setGoogleReady(true);
                };
                document.body.appendChild(script);
            } catch {
                if (!cancelled) {
                    setErrors((prev) => ({
                        ...prev,
                        _form: "Could not set up Google sign-in. Please try again.",
                    }));
                }
            }
        };

        setupGoogle();

        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // ---------------------------------------------------------------------
        // Validate email format before sending to the server.
        // WHY: surface an invalid email early instead of relying on the generic
        //   "Invalid email or password" from the backend.
        // ---------------------------------------------------------------------
        const nextErrors = { email: "", _form: "" };
        if (!formData.email.trim()) {
            nextErrors.email = "Email is required.";
        } else if (!EMAIL_REGEX.test(formData.email.trim())) {
            nextErrors.email = "Please enter a valid email address (e.g. you@example.com).";
        }
        if (!formData.password) {
            nextErrors._form = "Please enter your password.";
        }
        setErrors(nextErrors);
        if (nextErrors.email || nextErrors._form) {
            return;
        }

        try {
            const response = await api.post("/auth/login", formData);
            if (response.data.success) {
                localStorage.setItem("token", response.data.token);
            }
            // WHY: removed the original alert() success popup; we navigate to the
            //   profile page directly to indicate a successful login.
            navigate("/profile");
        } catch (error) {
            // WHY: replaced alert() with an inline error banner for clarity/UX.
            setErrors((prev) => ({
                ...prev,
                _form: error.response?.data?.message || "Login failed. Please try again.",
            }));
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

                        <button
                            type="button"
                            className="login-oauth-btn"
                            onClick={handleGoogleClick}
                            disabled={googleBusy}
                            aria-disabled={!googleReady}
                        >
                            <GoogleIcon />
                            {googleBusy ? "Signing in…" : "Continue with Google"}
                        </button>

                        <div className="login-divider">
                            <span className="login-mono">OR WITH EMAIL AND PASSWORD</span>
                        </div>

                        <form onSubmit={handleSubmit} autoComplete="off">
                            {errors._form && (
                                <div className="login-form-error">{errors._form}</div>
                            )}

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
                                {errors.email && (
                                    <p className="login-field__error">{errors.email}</p>
                                )}
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
