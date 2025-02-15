export const salaryTypes = {
    hourly: {
        label: "Hourly Rate",
        description: "Convert hourly wage to other pay periods",
        inputLabel: "Hourly Rate",
        inputPrefix: "$",
        inputSuffix: "/hr",
        conversions: {
            weekly: 40,
            biweekly: 80,
            monthly: 173.33,
            quarterly: 520,
            annually: 2080
        }
    },
    weekly: {
        label: "Weekly Salary",
        description: "Convert weekly salary to other pay periods",
        inputLabel: "Weekly Salary",
        inputPrefix: "$",
        inputSuffix: "/week",
        conversions: {
            hourly: 0.025,
            biweekly: 2,
            monthly: 4.333,
            quarterly: 13,
            annually: 52
        }
    },
    biweekly: {
        label: "Bi-Weekly Salary",
        description: "Convert bi-weekly salary to other pay periods",
        inputLabel: "Bi-Weekly Salary",
        inputPrefix: "$",
        inputSuffix: "/2 weeks",
        conversions: {
            hourly: 0.0125,
            weekly: 0.5,
            monthly: 2.167,
            quarterly: 6.5,
            annually: 26
        }
    },
    monthly: {
        label: "Monthly Salary",
        description: "Convert monthly salary to other pay periods",
        inputLabel: "Monthly Salary",
        inputPrefix: "$",
        inputSuffix: "/month",
        conversions: {
            hourly: 0.00577,
            weekly: 0.231,
            biweekly: 0.462,
            quarterly: 3,
            annually: 12
        }
    },
    quarterly: {
        label: "Quarterly Salary",
        description: "Convert quarterly salary to other pay periods",
        inputLabel: "Quarterly Salary",
        inputPrefix: "$",
        inputSuffix: "/quarter",
        conversions: {
            hourly: 0.00192,
            weekly: 0.0769,
            biweekly: 0.154,
            monthly: 0.333,
            annually: 4
        }
    },
    annually: {
        label: "Annual Salary",
        description: "Convert annual salary to other pay periods",
        inputLabel: "Annual Salary",
        inputPrefix: "$",
        inputSuffix: "/year",
        conversions: {
            hourly: 0.000481,
            weekly: 0.0192,
            biweekly: 0.0385,
            monthly: 0.0833,
            quarterly: 0.25
        }
    }
}; 