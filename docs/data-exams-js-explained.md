const exams = [
    {
        name: "JEE Main",
        fullForm: "Joint Entrance Examination Main",

        streams: ["Science"],

        educationLevel: "Class 12",

        minimumAge: 17,

        registrationStartDate: new Date("2026-01-15"),
        registrationEndDate: new Date("2026-02-15"),

        officialWebsite: "https://jeemain.nta.nic.in",

        description:
            "National level engineering entrance examination.",

        eligibility: {
            minimumEducation: "Class 12",
            minimumPercentage: 75,
            streamsAllowed: ["Science"],
        },

        subjects: [
            "Physics",
            "Chemistry",
            "Mathematics",
        ],

        redditLinks: [
            "https://reddit.com/..."
        ],

        quoraLinks: [
            "https://quora.com/..."
        ],
    },

    {
        ...
    }
];

module.exports = exams;