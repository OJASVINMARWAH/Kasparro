const express = require('express');
const router = express.Router();

/**
 * @desc    Stub for Transcript Data
 * @route   GET /api/stubs/transcript/:caseId
 */
router.get('/transcript/:caseId', (req, res) => {
  res.json({
    success: true,
    data: {
      caseId: req.params.caseId,
      status: 'completed',
      duration: '02:14',
      messages: [
        { speaker: 'Aura', text: 'Connecting to Live Vision...' },
        { speaker: 'Agent', text: 'I can see the package — there\'s visible damage on the top-right corner.' }
      ]
    }
  });
});

/**
 * @desc    Stub for Global Analytics
 * @route   GET /api/stubs/analytics
 */
router.get('/analytics', (req, res) => {
  res.json({
    success: true,
    data: {
      totalCases: 1245,
      resolvedAuto: 890,
      escalated: 355,
      averageConfidence: 88.4,
      systemHealth: 'Optimal'
    }
  });
});

/**
 * @desc    Stub for Live Session Verification
 * @route   GET /api/stubs/live-session/:caseId
 */
router.get('/live-session/:caseId', (req, res) => {
  res.json({
    success: true,
    data: {
      caseId: req.params.caseId,
      visionModel: 'aura-vision-1.4',
      fps: 32,
      detections: [
        { label: 'PACKAGE', confidence: 0.98 },
        { label: 'DAMAGE', confidence: 0.91 },
        { label: 'FRAGILE LABEL', confidence: 0.87 },
        { label: 'SHIPPING BARCODE', confidence: 0.82 }
      ]
    }
  });
});

module.exports = router;
