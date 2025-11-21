const express = require('express');
const router = express.Router();
const CMS_Controller = require('../controllers/CMS_Controller');
const upload = require('../middlewares/upload');
const auth = require('../middlewares/auth');

//For Desktop/Tab Banners
router.post('/uploadBanner',auth, upload.array("banners"), CMS_Controller.uploadBanners);
router.post("/addBanner", auth, upload.single("banner"), CMS_Controller.addBanner);
router.get('/fetchAllBanner', CMS_Controller.getAllBanners);
router.put('/updateBannerVisibility',auth, CMS_Controller.updateBannerVisibility)
router.delete('/deleteBanner',auth, CMS_Controller.deleteBanner)

//For mobile Banners
router.post('/uploadMobileBanner',auth, upload.array("banners"), CMS_Controller.uploadMobileBanners);
router.post("/addMobileBanner", auth, upload.single("banner"), CMS_Controller.addMobileBanner);
router.get('/fetchAllMobileBanner', CMS_Controller.getAllMobileBanners);
router.put('/updateBannerMobileVisibility',auth, CMS_Controller.updateBannerVisibility)
router.delete('/deleteMobileBanner',auth, CMS_Controller.deleteMobileBanner)

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
router.delete('/deletePackage',auth, CMS_Controller.deletePackage)


//For Testimonial
router.post('/add-review',auth, upload.single('profile_pic'), CMS_Controller.addReview);
router.patch('/update-visibility/:testimonial_Id',auth, CMS_Controller.updateVisibility);
router.delete('/delete-review/:testimonial_Id',auth, CMS_Controller.deleteReview);




module.exports = router;
