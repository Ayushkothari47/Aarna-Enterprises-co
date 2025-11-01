const cloudinary = require('cloudinary').v2;
const Package = require('../models/Package');
require('dotenv').config();

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Utility: Generate random package ID
const generatePackageId = () => `PKG_${Date.now()}_${Math.floor(Math.random() * 10000)}`;

// ✅ Add a new package
exports.addPackage = async (req, res) => {
  try {
    const { packageName, packageDescription, price } = req.body;
    const files = req.files;

    console.log("📦 Package Data:", req.body);
    console.log("🖼️ Uploaded Files:", Object.keys(files || {}));

    if (!packageName || !price) {
      return res.status(400).json({ message: "Package name and price are required." });
    }

    const packageId = `PKG_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    const uploadedImages = {};

    // Upload files from disk path
    const uploadFromDisk = async (filePath) => {
      return await cloudinary.uploader.upload(filePath, { folder: "travel_packages" });
    };

    if (files) {
      for (const key of Object.keys(files)) {
        const file = files[key][0];
        const result = await uploadFromDisk(file.path); // use file.path
        uploadedImages[key] = result.secure_url;
      }
    }

    const newPackage = new Package({
      packageId,
      packageName,
      packageDescription,
      price,
      ...uploadedImages, // merge uploaded URLs
    });

    await newPackage.save();

    res.status(201).json({
      message: "✅ Package added successfully!",
      data: newPackage,
    });
  } catch (error) {
    console.error("❌ Error adding package:", error);
    res.status(500).json({
      message: "Failed to add package",
      error: error.message,
    });
  }
};


// ✅ Fetch all packages
exports.fetchAllPackages = async (req, res) => {
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

// ✅ Delete a package
exports.deletePackage = async (req, res) => {
  try {
    const { packageId } = req.body;

    const pkg = await Package.findOne({ packageId });
    if (!pkg) {
      return res.status(404).json({ message: "Package not found." });
    }

    // Delete associated Cloudinary images
    const imageFields = ["thumbnail_url", "img1", "img2", "img3", "img4"];
    for (const field of imageFields) {
      if (pkg[field]) {
        // Extract Cloudinary public_id from URL
        const publicId = pkg[field].split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`travel_packages/${publicId}`);
      }
    }

    // Delete from MongoDB
    await Package.findOneAndDelete({ packageId });

    res.json({ message: "✅ Package deleted successfully" });
  } catch (error) {
    console.error("Error deleting package:", error);
    res.status(500).json({ message: "Failed to delete package", error: error.message });
  }
};
