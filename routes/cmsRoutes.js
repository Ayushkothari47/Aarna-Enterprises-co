const express = require('express');
const router = express.Router();
const CMS_Controller = require('../controllers/CMS_Controller');
const upload = require('../middlewares/upload');

router.post('/uploadBanner', upload.array("banners"), CMS_Controller.uploadBanners);
router.post('/addBanner', CMS_Controller.addBanner);
router.get('/fetchAllBanner', CMS_Controller.getAllBanners);
router.get('deleteBanner', CMS_Controller.deleteBanner)
router.put('updateBannerVisibility', CMS_Controller.updateBannerVisibility)

module.exports = router;
