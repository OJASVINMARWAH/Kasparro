const recommendationAgent = async ({
    intakeResult,
    verificationResult,
}) => {

    let decision = "REQUEST_MORE_EVIDENCE";

    let reasoning = "Insufficient verification confidence.";

    let confidence = 0.65;

    // Approval Logic
    if (
        verificationResult.productMatchConfidence > 0.8 &&
        verificationResult.damageConsistencyConfidence > 0.75
    ) {
        decision = "APPROVE_CLAIM";

        reasoning =
            "Product and damage verification are sufficiently consistent.";

        confidence = 0.89;
    }

    // Escalation Logic
    if (
        verificationResult.verificationStatus === "MISMATCH"
    ) {
        decision = "ESCALATE_CASE";

        reasoning =
            "Verification mismatch detected.";

        confidence = 0.42;
    }

    return {
        decision,

        reasoning,

        confidence,
    };
};

module.exports = recommendationAgent;