const express = require("express");

const router = express.Router();

const {
    uploadEvidence,
} = require("../controllers/evidenceController");

router.post("/", uploadEvidence);

module.exports = router;