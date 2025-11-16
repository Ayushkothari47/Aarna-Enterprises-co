const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const { uploadImage } = require('../controllers/galleryController');
const galleryController = require('../controllers/galleryController');
const auth = require('../middlewares/auth');

// Single API for image + manual data
router.post('/upload-image', upload.single('image'), uploadImage);
router.get('/fetchApprovedImage', galleryController.fetchAllApproved);
router.get('/fetchAllImages', galleryController.fetchAll);
router.post('/updateImage',auth, galleryController.updateImage);
router.post('/deleteImage',auth, galleryController.deleteImage);

module.exports = router;
