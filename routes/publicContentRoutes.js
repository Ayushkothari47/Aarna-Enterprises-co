const express = require('express');
const router = express.Router();
const CMS_Controller = require('../controllers/CMS_Controller');

router.get('/fetchAllBanner', CMS_Controller.getBanners);
router.get('/fetchAllMobileBanner', CMS_Controller.getMobileBanners);
router.get('/fetchPackages', CMS_Controller.fetchPackages);
router.get('/get-all-reviews',CMS_Controller.getAllReviews);


module.exports = router;
