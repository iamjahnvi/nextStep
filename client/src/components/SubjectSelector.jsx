import { SUBJECT_OPTIONS } from "../constants/profileOptions";

export default function SubjectSelector({ selected, onChange }) {
    const toggleSubject = (subject) => {
        if (selected.includes(subject)) {
            onChange(selected.filter((item) => item !== subject));
            return;
        }
        onChange([...selected, subject]);
    };

    return (
        <div className="subject-selector">
            <p className="subject-selector__label">Choose subjects</p>
            <div className="subject-selector__pills">
                {SUBJECT_OPTIONS.map((subject) => {
                    const isSelected = selected.includes(subject);
                    return (
                        <button
                            key={subject}
                            type="button"
                            className={`subject-pill${isSelected ? " subject-pill--selected" : ""}`}
                            aria-pressed={isSelected}
                            onClick={() => toggleSubject(subject)}
                        >
                            {subject}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
