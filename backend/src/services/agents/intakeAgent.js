const intakeAgent = async (caseData) => {

    const issueText = caseData.issue.toLowerCase();

    let category = "GENERAL";

    let priority = "LOW";

    let fraudRisk = "LOW";

    // Basic Classification Logic
    if (
        issueText.includes("damaged") ||
        issueText.includes("broken") ||
        issueText.includes("crack")
    ) {
        category = "DAMAGED_PRODUCT";

        priority = "HIGH";
    }

    if (
        issueText.includes("refund") ||
        issueText.includes("fake")
    ) {
        fraudRisk = "MEDIUM";
    }

    return {
        category,

        priority,

        fraudRisk,

        summary: `Customer reported: ${caseData.issue}`,

        confidence: 0.82,
    };
};

module.exports = intakeAgent;