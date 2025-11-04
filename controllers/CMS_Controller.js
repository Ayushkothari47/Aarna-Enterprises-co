const Banner = require("../models/Banner");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload banners controller
exports.uploadBanners = async (req, res) => {
  try {
    const files = req.files;

    if (files.length === 0) {
      return res.status(400).json({ message: "At least one banner are required." });
    }

    const uploadedBannerUrls = [];

    for (const file of files) {
      const result = await cloudinary.uploader.upload(file.path, { folder: "banners" });
      uploadedBannerUrls.push(result.secure_url);
    }

    const newBanner = new Banner({
      banners: uploadedBannerUrls,
    });

    await newBanner.save();

    res.status(201).json({
      message: "✅ Banners uploaded successfully!",
      data: newBanner,
    });
  } catch (error) {
    console.error("❌ Error uploading banners:", error);
    res.status(500).json({ message: "Failed to upload banners", error: error.message });
  }
};


// GET /api/banners - Fetch all banner URLs
exports.getAllBanners = async (req, res) => {
  try {
    // Fetch all banners from DB
    const banners = await Banner.find({}, "title banners"); // only select title and banners array

    if (!banners || banners.length === 0) {
      return res.status(404).json({ message: "No banners found." });
    }

    // Optionally, flatten into a simple array of URLs if needed
    // const allBannerUrls = banners.flatMap(b => b.banners);

    res.status(200).json({
      message: "✅ Banners fetched successfully",
      data: banners,
    });
  } catch (error) {
    console.error("❌ Error fetching banners:", error);
    res.status(500).json({
      message: "Failed to fetch banners",
      error: error.message,
    });
  }
};
