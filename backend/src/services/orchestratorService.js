const intakeAgent = require("./agents/intakeAgent");

const recommendationAgent = require("./agents/recommendationAgent");

const orchestratorService = async (caseData) => {

  // STEP 1 — Intake Analysis
  const intakeResult = await intakeAgent(caseData);

  // STEP 2 — Mock Verification Logic
  const verificationResult = {
    productMatchConfidence: 0.88,

    damageConsistencyConfidence: 0.79,

    detectedDamageType: caseData.claimedDamage || "Unknown",

    verificationStatus: "PARTIALLY_VERIFIED",

    notes: "Initial mock verification completed.",
  };

  // STEP 3 — Recommendation
  const recommendationResult = await recommendationAgent({
    intakeResult,
    verificationResult,
  });

  // STEP 4 — Workflow Decision
  let workflowStatus = "UNDER_REVIEW";

  let escalationRequired = false;

  if (
    recommendationResult.confidence < 0.7 ||
    verificationResult.verificationStatus === "MISMATCH"
  ) {
    workflowStatus = "ESCALATED";

    escalationRequired = true;
  }

  // STEP 5 — Final Orchestration Object
  return {
    workflowStatus,

    escalationRequired,

    confidenceScore: recommendationResult.confidence,

    agentResults: {
      intake: intakeResult,

      verification: verificationResult,

      recommendation: recommendationResult,
    },
  };
};

module.exports = orchestratorService;