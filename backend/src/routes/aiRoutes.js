const express =
    require('express');

const router =
    express.Router();

const {
    analyzeTranscript
} = require(
    '../controllers/aiController'
);

router.post(
    '/analyze-transcript',
    analyzeTranscript
);

module.exports =
    router;