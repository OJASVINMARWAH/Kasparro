const Evidence = require("../models/Evidence");

const Case = require("../models/Case");

const uploadEvidence = async (req, res) => {

    try {

        const {
            caseId,
            fileUrl,
            fileType,
        } = req.body;

        // STEP 1 — Create Evidence
        const newEvidence = await Evidence.create({

            caseId,

            fileUrl,

            fileType,

            verificationStatus: "PROCESSING",

            aiAnalysis: {
                detectedObject: "Headphones",

                detectedDamage: "Cracked earcup",

                productMatchConfidence: 0.87,

                damageConsistencyConfidence: 0.81,

                notes:
                    "Mock verification analysis completed.",
            },
        });

        // STEP 2 — Attach Evidence To Case
        await Case.findByIdAndUpdate(
            caseId,
            {
                $push: {
                    evidenceFiles: {
                        fileUrl,
                        fileType,
                    },
                },

                workflowStatus:
                    "VERIFICATION_RUNNING",
            }
        );

        // STEP 3 — Response
        res.status(201).json({
            success: true,

            message:
                "Evidence uploaded successfully",

            data: newEvidence,
        });

    } catch (error) {

        res.status(500).json({
            success: false,

            message: error.message,
        });
    }
};

module.exports = {
    uploadEvidence,
};