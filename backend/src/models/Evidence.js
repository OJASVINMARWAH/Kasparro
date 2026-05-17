const mongoose = require("mongoose");

const EvidenceSchema = new mongoose.Schema(
    {
        caseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Case",
            required: true,
        },

        fileUrl: {
            type: String,
            required: true,
        },

        fileType: {
            type: String,
            enum: ["IMAGE", "VIDEO"],
            required: true,
        },

        uploadedBy: {
            type: String,
            default: "CUSTOMER",
        },

        verificationStatus: {
            type: String,
            enum: [
                "PENDING",
                "PROCESSING",
                "VERIFIED",
                "REJECTED",
            ],
            default: "PENDING",
        },

        aiAnalysis: {
            detectedObject: String,

            detectedDamage: String,

            productMatchConfidence: Number,

            damageConsistencyConfidence: Number,

            notes: String,
        },
    },

    {
        timestamps: true,
    }
);

module.exports = mongoose.model(
    "Evidence",
    EvidenceSchema
);