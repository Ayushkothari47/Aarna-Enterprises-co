const cloudinary = require('cloudinary').v2;
const Image = require('../models/Gallery');
require('dotenv').config();

const generateImageId = () => `img_${Date.now()}_${Math.floor(Math.random() * 10000)}`;

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


exports.fetchAllApproved = async (req, res) => {
  try {
    // Fetch all images that are approved
    const approvedImages = await Image.find({ isApproved: true }).sort({ createdAt: -1 });

    // If no images found
    if (!approvedImages.length) {
      return res.status(404).json({ message: 'No approved images found.' });
    }

    // Send response
    res.status(200).json({
      message: 'Approved images fetched successfully.',
      count: approvedImages.length,
      data: approvedImages,
    });
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ message: 'Failed to fetch images.', error: error.message });
  }
};


exports.fetchAll = async (req, res) => {
  try {
    // Fetch all images that are approved
    const approvedImages = await Image.find({}).sort({ createdAt: -1 });

    // If no images found
    if (!approvedImages.length) {
      return res.status(404).json({ message: 'No approved images found.' });
    }

    // Send response
    res.status(200).json({
      message: 'Approved images fetched successfully.',
      count: approvedImages.length,
      data: approvedImages,
    });
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ message: 'Failed to fetch images.', error: error.message });
  }
};

exports.uploadImage = async (req, res) => {
  
  try {
    const { author } = req.body;

    const imgId = generateImageId(); // auto-generate ID


    // Check for required fields
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided.' });
    }
    if (!imgId) {
      return res.status(400).json({ message: 'imgId is required.' });
    }

    // Upload image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      public_id: imgId,
      folder: 'gallery_uploads',
      overwrite: true,
    });

    // Save to MongoDB
    const imageDoc = new Image({
      imgId,
      author: author || 'Anonymous',
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
      isApproved: false,
    });

    await imageDoc.save();

    res.status(201).json({
      message: 'Image and data uploaded successfully!',
      data: imageDoc,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      message: 'Image upload failed',
      error: error.message,
    });
  }
};


exports.deleteImage = async (req, res) => {
  try {
    const { imgId } = req.body;

    // Find image in DB
    const image = await Image.findOne({ imgId });
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // Delete from Cloudinary
    if (image.public_id) {
      await cloudinary.uploader.destroy(image.public_id);
    } else {
      console.warn(`⚠️ No public_id found for image ${imgId}, skipping Cloudinary delete`);
    }

    // Delete from MongoDB
    await Image.findOneAndDelete({ imgId });

    res.json({ message: "✅ Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ message: "Failed to delete image", error: error.message });
  }
};


exports.updateImage = async (req, res) => {
  try {
    const { imgId, isApproved } = req.body;

    if (typeof isApproved !== "boolean") {
      return res.status(400).json({ message: "isApproved must be a boolean value" });
    }

    // Update document
    const updatedImage = await Image.findOneAndUpdate(
      { imgId }, 
      { isApproved },
      { new: true }
    );

    if (!updatedImage) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.status(200).json({
      message: "✅ Approval status updated successfully",
      data: updatedImage,
    });
  } catch (error) {
    console.error("Error updating image approval:", error);
    res.status(500).json({
      message: "Failed to update approval status",
      error: error.message,
    });
  }
};


