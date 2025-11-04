const express = require('express');
const router = express.Router();
const CMS_Controller = require('../controllers/CMS_Controller');
const upload = require('../middlewares/upload');

router.post('/uploadBanner', upload.array("banners"), CMS_Controller.uploadBanners);
router.post('/fetchAllBanner', CMS_Controller.getAllBanners);

module.exports = router;
