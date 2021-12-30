const express = require('express');
const router = express.Router();
const questionController = require('../controllers/ques_controller.js');
router.post('/questionUpload', questionController.questionUpload);
router.post('/puzzleUpload', questionController.puzzleUpload);


module.exports = router;