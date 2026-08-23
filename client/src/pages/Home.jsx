import { useNavigate } from "react-router-dom";
import "./Home.css";

const EXAM_STRIP = [
    "JEE MAIN",
    "NEET",
    "CUET",
    "CLAT",
    "CAT",
    "UPSC CSE",
    "GATE",
    "NDA",
    "CDS",
    "BITSAT",
    "XAT",
    "VITEEE",
    "SSC CGL",
    "IBPS PO",
];

const MATCHED_EXAMS = ["JEE MAIN", "JEE ADVANCED", "BITSAT", "CUET", "VITEEE", "COMEDK"];

const BARCODE_HEIGHTS = [24, 14, 22, 10, 24, 18, 12, 24];

const STEPS = [
    {
        num: "01",
        title: "Tell us about your profile",
        text: "Class, stream, board, marks and category — the same details every exam form asks for anyway.",
    },
    {
        num: "02",
        title: "We check the fine print",
        text: "We run your details against the eligibility rules of every major national exam, updated each admission cycle.",
    },
    {
        num: "03",
        title: "Get your matched list",
        text: "A clean list of exams you qualify for, with deadlines — so you know exactly where to spend your prep time.",
    },
];

function Home() {
    const navigate = useNavigate();
    const stripItems = [...EXAM_STRIP, ...EXAM_STRIP];

    return (
        <div className="home-page">
            <nav className="home-nav">
                <div className="home-brand">
                    <span className="home-brand-mark home-mono">N</span>
                    NextStep
                </div>
                <button
                    type="button"
                    className="home-nav-login home-mono"
                    onClick={() => navigate("/login")}
                >
                    Login →
                </button>
            </nav>

            <section className="home-hero">
                <div className="home-hero__copy">
                    <div className="home-eyebrow">Eligibility check</div>
                    <h1 className="home-hero__title">
                        Find every exam
                        <br />
                        you&apos;re <em>actually</em>
                        <br />
                        eligible for.
                    </h1>
                    <p className="home-sub">
                        Answer a few questions about your class, stream and marks. We&apos;ll match
                        your profile against 40+ national entrance exams — no guesswork, no missed
                        deadlines.
                    </p>
                    <div className="home-cta-row">
                        <button
                            type="button"
                            className="home-btn home-btn--primary"
                            onClick={() => navigate("/signup")}
                        >
                            Get started
                        </button>
                        <button
                            type="button"
                            className="home-btn home-btn--secondary"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </button>
                    </div>
                    <div className="home-trust home-mono">
                        Trusted by students prepping for JEE, NEET, CUET &amp; CLAT
                    </div>
                </div>

                <div className="home-card-stage">
                    <div className="home-admit-card">
                        <div className="home-card-top">
                            <div>
                                <div className="home-mono home-card-label">ELIGIBILITY SLIP</div>
                                <div className="home-card-title">Your Exam Match</div>
                            </div>
                            <div className="home-barcode" aria-hidden="true">
                                {BARCODE_HEIGHTS.map((height, index) => (
                                    <span key={index} style={{ height: `${height}px` }} />
                                ))}
                            </div>
                        </div>

                        <div className="home-card-body">
                            <div className="home-photo-box home-mono">A</div>
                            <div className="home-fields">
                                <div className="home-field">
                                    <label className="home-mono">CLASS / STREAM</label>
                                    <div className="home-field__val">12th · Science (PCM)</div>
                                </div>
                                <div className="home-field">
                                    <label className="home-mono">STATE BOARD</label>
                                    <div className="home-field__val">CBSE</div>
                                </div>
                            </div>
                        </div>

                        <div className="home-card-matches">
                            <div className="home-matches-label home-mono">MATCHED EXAMS (6)</div>
                            <div className="home-chip-row">
                                {MATCHED_EXAMS.map((exam) => (
                                    <span key={exam} className="home-chip home-mono">
                                        {exam}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="home-stamp home-mono">
                            ELIGIBLE
                            <br />
                            ✓ VERIFIED
                        </div>
                    </div>
                </div>
            </section>

            <div className="home-strip-wrap">
                <div className="home-strip home-mono" aria-hidden="true">
                    {stripItems.map((exam, index) => (
                        <span key={`${exam}-${index}`}>{exam}</span>
                    ))}
                </div>
            </div>

            <section className="home-how">
                <div className="home-how-head">
                    <h2>Three steps. Two minutes.</h2>
                    <p>
                        No lengthy sign-up forms, no PDFs to dig through. Just tell us who you are,
                        and we&apos;ll tell you what you can apply for.
                    </p>
                </div>
                <div className="home-steps">
                    {STEPS.map((step) => (
                        <div key={step.num} className="home-step">
                            <div className="home-step-num home-mono">{step.num}</div>
                            <h3>{step.title}</h3>
                            <p>{step.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="home-footer-cta">
                <div className="home-fc-inner">
                    <div>
                        <h3>Stop guessing which exams to prep for.</h3>
                        <p>Get your personalized eligibility list in under two minutes.</p>
                    </div>
                    <button
                        type="button"
                        className="home-btn home-btn--primary"
                        onClick={() => navigate("/signup")}
                    >
                        Check my eligibility
                    </button>
                </div>
            </section>

            <footer className="home-footer home-mono">
                <span>© 2026 NextStep</span>
                <span>Made for students navigating India&apos;s exam maze</span>
            </footer>
        </div>
    );
}

export default Home;
