const express = require("express");

const router = express.Router();

const {
  analyzeTranscript,
  processAuraWorkflow,
} = require("../controllers/aiController");

router.post(
  "/analyze-transcript",
  analyzeTranscript
);

router.post(
  "/workflow",
  processAuraWorkflow
);

module.exports = router;