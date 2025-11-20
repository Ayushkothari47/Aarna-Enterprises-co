const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middlewares/auth')


router.post('/admin-register', adminController.registerAdmin);
router.post('/admin-login', adminController.loginAdmin);
router.get('/fetchAllAdmins', auth,adminController.fetchAllAdmins);

module.exports = router;
