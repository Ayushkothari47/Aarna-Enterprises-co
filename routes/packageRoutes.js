const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const packageController = require('../controllers/packageController');

// Multer fields for multiple images
// Expecting keys: thumbnail_url, img1, img2, img3, img4
router.post(
  '/addPackage',
  upload.fields([
    { name: 'thumbnail_url', maxCount: 1 },
    { name: 'img1', maxCount: 1 },
    { name: 'img2', maxCount: 1 },
    { name: 'img3', maxCount: 1 },
    { name: 'img4', maxCount: 1 },
  ]),
  packageController.addPackage
);

router.get('/fetchAllPackages', packageController.fetchAllPackages);
router.post('/deletePackage', packageController.deletePackage);

module.exports = router;
