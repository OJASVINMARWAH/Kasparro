const express = require("express");

const router = express.Router();

const upload =
  require("../middleware/uploadMiddleware");

const {
  createCase,
  getAllCases,
  getCaseById,
  updateCaseStatus
} = require(
  "../controllers/caseController"
);

// CREATE CASE
router.post(
  "/",
  upload.array(
    "evidenceFiles",
    5
  ),
  createCase
);

// GET ALL CASES
router.get(
  "/",
  getAllCases
);

// GET SINGLE CASE
router.get(
  "/:id",
  getCaseById
);

// UPDATE CASE STATUS
router.put(
  "/:id/status",
  updateCaseStatus
);

module.exports = router;