const Case = require("../models/Case");

const orchestratorService =
  require("../services/orchestratorService");

// CREATE CASE
const createCase = async (req, res) => {

  try {

    const {
      customerName,
      customerEmail,
      orderId,
      issue,
      claimedDamage,
      productId,
    } = req.body;

    // PROCESS EVIDENCE FILES
    const evidenceFiles = req.files ? req.files.map(file => ({
      fileUrl: `/uploads/${file.filename}`,
      fileType: file.mimetype
    })) : [];

    // RUN ORCHESTRATION
    // Provide mapped files to orchestration if needed by agents
    const orchestrationPayload = { ...req.body, evidenceFiles };
    const orchestrationResult =
      await orchestratorService(orchestrationPayload);

    // CREATE ENRICHED CASE
    const newCase = await Case.create({

      customerName,

      customerEmail,

      orderId,

      issue,

      claimedDamage,

      productId,

      evidenceFiles,

      workflowStatus:
        orchestrationResult.workflowStatus,

      escalationRequired:
        orchestrationResult.escalationRequired,

      confidenceScore:
        orchestrationResult.confidenceScore,

      agentResults:
        orchestrationResult.agentResults,

      analytics: {

        region: "INDIA",

        customerRiskLevel:
          orchestrationResult
            ?.agentResults
            ?.intake
            ?.fraudRisk || "LOW",

        productCategory:
          "ELECTRONICS",
      },

      eventStream: [

        {
          eventType:
            "CLAIM_SUBMITTED",

          actor:
            "CUSTOMER",

          eventMessage:
            "Claim submitted by customer",
        },

        {
          eventType:
            "AI_REVIEW_STARTED",

          actor:
            "AI_AGENT",

          eventMessage:
            "AI verification workflow initiated",
        },

        {
          eventType:
            "AI_ANALYSIS_COMPLETE",

          actor:
            "AI_AGENT",

          eventMessage:
            `Verification status: ${orchestrationResult
              ?.agentResults
              ?.verification
              ?.verificationStatus
            }`,
        },

      ],
    });

    // RESPONSE
    res.status(201).json({

      success: true,

      message:
        "Aura orchestration completed successfully",

      data: newCase,
    });

  } catch (error) {

    console.error(
      "Create Case Error:",
      error
    );

    res.status(500).json({

      success: false,

      message: error.message,
    });
  }
};

// GET ALL CASES
const getAllCases = async (req, res) => {

  try {

    const cases = await Case.find()
      .sort({ createdAt: -1 });

    res.status(200).json({

      success: true,

      count: cases.length,

      data: cases,
    });

  } catch (error) {

    console.error(
      "Get Cases Error:",
      error
    );

    res.status(500).json({

      success: false,

      message: error.message,
    });
  }
};

// GET SINGLE CASE
const getCaseById = async (req, res) => {

  try {

    const caseData = await Case.findById(
      req.params.id
    );

    if (!caseData) {

      return res.status(404).json({

        success: false,

        message: "Case not found",
      });
    }

    res.status(200).json({

      success: true,

      data: caseData,
    });

  } catch (error) {

    console.error(
      "Get Case Error:",
      error
    );

    res.status(500).json({

      success: false,

      message: error.message,
    });
  }
};

const updateCaseStatus = async (req, res) => {

  try {

    console.log(
      "N8N STATUS UPDATE:",
      req.params.id
    );

    console.log(
      req.body
    );

    const updatedCase =
      await Case.findOneAndUpdate(

        {
          ticketId:
            req.params.id
        },

        {
          status:
            req.body.workflowStatus,

          latestEvent:
            req.body.eventType,

          eventMessage:
            req.body.eventMessage
        },

        {
          new: true
        }
      );

    if (!updatedCase) {

      console.log(
        "NEW ORCHESTRATION LOGIC RUNNING"
      );

      const newCase =
        await Case.create({

          ticketId:
            req.params.id,

          customerName:
            "AI Orchestrated User",

          orderId:
            "ORD-" + Date.now(),

          issue:
            req.body.eventMessage ||
            "AI workflow initiated",

          status:
            req.body.workflowStatus,

          latestEvent:
            req.body.eventType,

          eventMessage:
            req.body.eventMessage
        });

      return res.json({

        success: true,

        message:
          "New case created by orchestration",

        updatedCase:
          newCase
      });
    }

    res.json({

      success: true,

      message:
        "Case updated successfully",

      updatedCase
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      error:
        error.message
    });
  }
};

module.exports = {

  createCase,

  getAllCases,

  getCaseById,

  updateCaseStatus,
};