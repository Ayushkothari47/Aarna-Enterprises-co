const express = require('express');
const router = express.Router();
const CMS_Controller = require('../controllers/CMS_Controller');
const upload = require('../middlewares/upload');

//For Banners
router.post('/uploadBanner', upload.array("banners"), CMS_Controller.uploadBanners);
router.post("/addBanner", upload.single("banner"), CMS_Controller.addBanner);
router.get('/fetchAllBanner', CMS_Controller.getAllBanners);
router.delete('/deleteBanner', CMS_Controller.deleteBanner)
router.put('/updateBannerVisibility', CMS_Controller.updateBannerVisibility)

//For Packages
router.get('/fetchAllPackages', CMS_Controller.fetchAllPackages);
router.post("/updatePackage", multer.fields([
  { name: "thumbnail_url", maxCount: 1 },
  { name: "img1", maxCount: 1 },
  { name: "img2", maxCount: 1 },
  { name: "img3", maxCount: 1 },
]), CMS_Controller.updatePackage);


module.exports = router;
