const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/admin-register', adminController.registerAdmin);
router.post('/admin-login', adminController.loginAdmin);
// router.post('/admin-update', adminController.updateAdmin);

module.exports = router;
