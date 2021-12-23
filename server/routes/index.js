const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin_controller.js');
router.post('/login', adminController.login);
router.post('/signUp', adminController.signUp);
router.post('/check', adminController.check);
router.use('/admin', require('./admin'));
module.exports = router;