const express = require('express');
const router = express.Router();
const adminController = require('../controllers/ques_controller.js');
router.post('/questionUpload', adminController.questionUpload);
router.post('/puzzleUpload', adminController.puzzleUpload);


module.exports = router;