const mongoose = require("mongoose");

const CaseSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    customerEmail: {
      type: String,
      trim: true,
    },

    orderId: {
      type: String,
      required: true,
      trim: true,
    },

    issue: {
      type: String,
      required: true,
    },

    claimedDamage: {
      type: String,
      trim: true,
    },

    productId: {
      type: String,
      trim: true,
    },

    workflowStatus: {
      type: String,
      enum: [
        "RECEIVED",
        "UNDER_REVIEW",
        "WAITING_FOR_EVIDENCE",
        "VERIFICATION_RUNNING",
        "ESCALATED",
        "APPROVED",
        "REJECTED",
        "RESOLVED",
      ],
      default: "RECEIVED",
    },

    escalationRequired: {
      type: Boolean,
      default: false,
    },

    confidenceScore: {
      type: Number,
      default: 0,
    },

    agentResults: {
      intake: {
        category: String,

        priority: String,

        fraudRisk: String,

        summary: String,

        confidence: Number,
      },

      verification: {
        productMatchConfidence: {
          type: Number,
          default: 0,
        },

        damageConsistencyConfidence: {
          type: Number,
          default: 0,
        },

        detectedDamageType: {
          type: String,
          trim: true,
        },

        verificationStatus: {
          type: String,
          enum: [
            "VERIFIED",
            "PARTIALLY_VERIFIED",
            "INCONCLUSIVE",
            "MISMATCH",
          ],
          default: "INCONCLUSIVE",
        },

        notes: {
          type: String,
          trim: true,
        },
      },

      recommendation: {
        decision: {
          type: String,
          trim: true,
        },

        reasoning: {
          type: String,
          trim: true,
        },

        confidence: {
          type: Number,
          default: 0,
        },
      },
    },

    transcriptData: [
      {
        speaker: String,

        message: String,

        timestamp: String,
      },
    ],

    evidenceFiles: [
      {
        fileUrl: String,

        fileType: String,

        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    analytics: {
      region: String,

      customerRiskLevel: String,

      productCategory: String,
    },

    eventStream: [
      {
        eventType: {
          type: String,
        },

        actor: {
          type: String,

          enum: [
            "CUSTOMER",
            "AI_AGENT",
            "SUPPORT_AGENT",
            "SYSTEM",
          ],
        },

        eventMessage: {
          type: String,
        },

        eventMetadata: {
          type: Object,
          default: {},
        },

        eventTimestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Case", CaseSchema);