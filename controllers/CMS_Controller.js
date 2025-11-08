const Banner = require("../models/Banner");
const Package = require("../models/Package");
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


// GET /api/banners - Fetch all banner URLs     - FOR ADMINS
exports.getAllBanners = async (req, res) => {
  try {
    // Fetch all banners from DB
    const banners = await Banner.find({});

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


// GET /api/banners - Fetch all visible banner URLs   -  FOR USERS
exports.getBanners = async (req, res) => {
  try {
    // Fetch only banners where isVisible is true
    const banners = await Banner.find({ isVisible: true });

    if (!banners || banners.length === 0) {
      return res.status(404).json({ message: "No visible banners found." });
    }

    // Optionally, flatten into a simple array of URLs if needed
    // const allBannerUrls = banners.flatMap(b => b.banners);

    res.status(200).json({
      message: "✅ Visible banners fetched successfully",
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

// DELETE /CMS/deleteBanner
exports.deleteBanner = async (req, res) => {
  try {
    const { bannerUrl } = req.body;

    if (!bannerUrl) {
      return res.status(400).json({ message: "Banner URL is required." });
    }

    // Find and update document by pulling out banner URL
    const updated = await Banner.findOneAndUpdate(
      {},
      { $pull: { banners: bannerUrl } },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "No banner found to delete." });
    }

    res.status(200).json({
      message: "🗑 Banner deleted successfully",
      data: updated,
    });
  } catch (error) {
    console.error("❌ Error deleting banner:", error);
    res.status(500).json({
      message: "Failed to delete banner",
      error: error.message,
    });
  }
};


// PUT /CMS/updateBannerVisibility
exports.updateBannerVisibility = async (req, res) => {
  try {
    const { isVisible } = req.body;

    if (typeof isVisible !== "boolean") {
      return res.status(400).json({
        message: "❌ isVisible (boolean) is required in request body.",
      });
    }

    // Update the visibility flag in the single Banner document
    const updated = await Banner.findOneAndUpdate(
      {}, // No filter → updates the first (or only) banner doc
      { isVisible },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        message: "⚠️ No banner document found to update.",
      });
    }

    res.status(200).json({
      message: `✅ Banner visibility updated to ${isVisible ? "Visible" : "Hidden"}`,
      data: updated,
    });
  } catch (error) {
    console.error("❌ Error updating banner visibility:", error);
    res.status(500).json({
      message: "Failed to update banner visibility",
      error: error.message,
    });
  }
};


// POST /CMS/addBanner
exports.addBanner = async (req, res) => {
  try {
    const file = req.file; // single file (use multer.single("banner"))

    if (!file) {
      return res.status(400).json({ message: "❌ Banner file is required." });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(file.path, { folder: "banners" });

    // Append the Cloudinary URL to the existing banner document
    const updated = await Banner.findOneAndUpdate(
      {},
      { $push: { banners: result.secure_url } },
      { new: true, upsert: true }
    );

    res.status(200).json({
      message: "✅ Banner uploaded and added successfully!",
      data: updated,
    });
  } catch (error) {
    console.error("❌ Error uploading banner:", error);
    res.status(500).json({
      message: "Failed to upload banner",
      error: error.message,
    });
  }
};


//GET   
exports.fetchPackages = async (req, res) => {
  try {
    const packages = await Package.find().sort({ createdAt: -1 });

    if (!packages.length) {
      return res.status(404).json({ message: "No packages found." });
    }

    res.status(200).json({
      message: "✅ Packages fetched successfully",
      count: packages.length,
      data: packages,
    });
  } catch (error) {
    console.error("Error fetching packages:", error);
    res.status(500).json({ message: "Failed to fetch packages", error: error.message });
  }
};