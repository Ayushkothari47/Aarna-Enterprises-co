const express = require('express');
const router = express.Router();
const CMS_Controller = require('../controllers/CMS_Controller');
const upload = require('../middlewares/upload');

//For Banners
router.post('/uploadBanner', upload.array("banners"), CMS_Controller.uploadBanners);
router.post("/addBanner", upload.single("banner"), CMS_Controller.addBanner);
router.get('/fetchAllBanner', CMS_Controller.getAllBanners);
router.put('/updateBannerVisibility', CMS_Controller.updateBannerVisibility)
router.delete('/deleteBanner', CMS_Controller.deleteBanner)

//For Packages
router.post(
  '/addPackage',
  upload.fields([
    { name: 'thumbnail_url', maxCount: 1 },
    { name: 'img1', maxCount: 1 },
    { name: 'img2', maxCount: 1 },
    { name: 'img3', maxCount: 1 },
  ]),
  CMS_Controller.addPackage
);
router.get('/fetchAllPackages', CMS_Controller.fetchAllPackages);
router.post(
    '/updatePackage',
    upload.fields([
        { name: 'thumbnail_url', maxCount: 1 },
        { name: 'img1', maxCount: 1 },
        { name: 'img2', maxCount: 1 },
        { name: 'img3', maxCount: 1 },
    ]),
    CMS_Controller.updatePackage
);
router.delete('/deletePackage', CMS_Controller.deletePackage)




module.exports = router;
