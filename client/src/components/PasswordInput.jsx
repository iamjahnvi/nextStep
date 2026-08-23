import { useState } from "react";

function EyeIcon({ hidden }) {
    if (hidden) {
        return (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                    d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a18.6 18.6 0 0 1 5.06-5.94M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 7 11 7a18.6 18.6 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                />
            </svg>
        );
    }

    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.75" />
        </svg>
    );
}

export default function PasswordInput({
    id,
    name,
    value,
    onChange,
    placeholder,
    autoComplete = "new-password",
    hint,
    minLength,
    required = false,
}) {
    const [visible, setVisible] = useState(false);

    return (
        <div className="password-field">
            <div className="password-field__shell">
                <input
                    id={id}
                    type={visible ? "text" : "password"}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    data-lpignore="true"
                    data-1p-ignore="true"
                    minLength={minLength}
                    required={required}
                />
                <button
                    type="button"
                    className="password-field__toggle"
                    onClick={() => setVisible((show) => !show)}
                    aria-label={visible ? "Hide password" : "Show password"}
                >
                    <EyeIcon hidden={!visible} />
                </button>
            </div>
            {hint && <p className="password-field__hint">{hint}</p>}
        </div>
    );
}
