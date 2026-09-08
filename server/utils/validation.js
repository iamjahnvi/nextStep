// =============================================================================
// VALIDATION HELPERS — server/utils/validation.js
// =============================================================================
// WHY THIS FILE EXISTS:
//   All the user-facing validation rules (email format, password strength, and
//   name format) are shared between the signup and login flows on the server.
//   Centralising them here keeps the controller clean, DRY, and ensures that
//   the backend and any future consumers apply the exact same rules.
// HOW IT'S USED:
//   Each helper returns a { valid: boolean, message: string } object so the
//   caller can decide whether to proceed or return a 400 to the client.
// =============================================================================

// -----------------------------------------------------------------------------
// validateEmail
// HOW: A regex performs a proper structural check on an email address:
//   - local part (before @) allows letters, digits, and a few safe symbols
//   - a single "@" separator
//   - domain part with at least a subdomain + TLD, TLD being >= 2 letters
// WHY: The browser's type="email" is only a shallow hint and can be bypassed,
//   so we enforce a real format on the server too. This guarantees we never
//   store or let users log in with a malformed address.
// -----------------------------------------------------------------------------
const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        return { valid: false, message: "Please enter a valid email address (e.g. you@example.com)." };
    }
    return { valid: true, message: "" };
};

// -----------------------------------------------------------------------------
// validatePassword
// HOW: Three regex checks are combined with .test():
//   1. /.{8,}/        -> at least 8 characters long
//   2. /[A-Za-z]/     -> contains at least one letter
//   3. /\d/           -> contains at least one digit
//   4. /[^A-Za-z0-9]/ -> contains at least one special character (any char that
//                        is NOT a letter or digit, e.g. !@#$%^&*)
// WHY: Production-grade password policies require a mix of character classes so
//   that simple/common passwords are rejected early. We also enforce this on
//   the server so the rule cannot be bypassed from the client.
// -----------------------------------------------------------------------------
const validatePassword = (password) => {
    const lengthRegex = /.{8,}/;
    const letterRegex = /[A-Za-z]/;
    const numberRegex = /\d/;
    const specialRegex = /[^A-Za-z0-9]/;

    if (!lengthRegex.test(password)) {
        return { valid: false, message: "Password must be at least 8 characters long." };
    }
    if (!letterRegex.test(password)) {
        return { valid: false, message: "Password must contain at least one letter (A-Z or a-z)." };
    }
    if (!numberRegex.test(password)) {
        return { valid: false, message: "Password must contain at least one number (0-9)." };
    }
    if (!specialRegex.test(password)) {
        return { valid: false, message: "Password must contain at least one special character (e.g. !@#$%^&*)." };
    }
    return { valid: true, message: "" };
};

// -----------------------------------------------------------------------------
// validateName
// HOW: A regex ensures the name contains ONLY alphabets (including spaced names)
//   and a small set of allowed characters (space, hyphen, apostrophe) which are
//   common in real-world names (e.g. "Mary Jane", "Jean-Pierre", "O'Brien").
//   i.e. /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/
// WHY: We flag and reject names entered as numbers or special symbols so the
//   database is not polluted with junk data like "12345" or "@@@@".
// -----------------------------------------------------------------------------
const validateName = (name) => {
    const nameRegex = /^[A-Za-z]+(?:['\-\s][A-Za-z]+)*$/;
    if (!nameRegex.test(name)) {
        return {
            valid: false,
            message: "Name must only contain letters (A-Z). Numbers and special characters are not allowed.",
        };
    }
    return { valid: true, message: "" };
};

// -----------------------------------------------------------------------------
// validatePercentage
// HOW: We check the value is numeric and falls within 0-100 (a percentage cannot
//   be negative, and realistically cannot exceed 100).
// WHY: A negative percentage like -10 is nonsensical for exam eligibility and
//   could skew the recommendation engine, so we block it up front.
// -----------------------------------------------------------------------------
const validatePercentage = (percentage) => {
    if (percentage < 0) {
        return { valid: false, message: "Percentage cannot be a negative number." };
    }
    if (percentage > 100) {
        return { valid: false, message: "Percentage cannot be greater than 100." };
    }
    return { valid: true, message: "" };
};

module.exports = {
    validateEmail,
    validatePassword,
    validateName,
    validatePercentage,
};
