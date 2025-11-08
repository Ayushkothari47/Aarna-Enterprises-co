const express = require('express');
const router = express.Router();
const CMS_Controller = require('../controllers/CMS_Controller');

router.get('/fetchAllBanner', CMS_Controller.getBanners);


module.exports = router;
