export const overtimeRules = {
    Federal: {
        weekly_limit: 40,
        daily_limit: null,
        description: "Standard FLSA rules with overtime after 40 hours per week"
    },
    California: {
        weekly_limit: 40,
        daily_limit: 8,
        "2x": 12,
        description: "Daily overtime after 8 hours, double time after 12 hours, and weekly overtime after 40 hours"
    },
    Alaska: {
        weekly_limit: 40,
        daily_limit: 8,
        description: "Daily overtime after 8 hours and weekly overtime after 40 hours"
    },
    Nevada: {
        weekly_limit: 40,
        daily_limit: 8,
        description: "Daily overtime after 8 hours if employee makes less than 1.5× minimum wage"
    },
    Colorado: {
        weekly_limit: 40,
        daily_limit: 12,
        description: "Daily overtime after 12 hours and weekly overtime after 40 hours"
    },
    // Add all other states following federal rules
    ...Object.fromEntries(
        [
            "Alabama", "Arizona", "Arkansas", "Connecticut", "Delaware", "Florida",
            "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas",
            "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
            "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "New Hampshire",
            "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota",
            "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
            "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia",
            "Washington", "West Virginia", "Wisconsin", "Wyoming"
        ].map(state => [
            state,
            {
                weekly_limit: 40,
                daily_limit: null,
                description: "Follows federal FLSA rules with overtime after 40 hours per week"
            }
        ])
    )
}; 