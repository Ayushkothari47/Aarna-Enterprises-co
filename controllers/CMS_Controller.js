const Banner = require("../models/Banner");
const Package = require("../models/Package");
const Testimonial = require('../models/Testimonial');
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


//GET    - FOR USERS
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



// ✅ Fetch all packages   - FOR ADMIN
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


// ✅ Update an existing package
exports.updatePackage = async (req, res) => {
  try {
    const { packageId, packageName, packageDescription, price } = req.body;
    const files = req.files;

    console.log("🛠️ Updating Package:", packageId);
    console.log("📦 Updated Data:", req.body);
    console.log("🖼️ New Files:", Object.keys(files || {}));

    if (!packageId) {
      return res.status(400).json({ message: "❌ packageId is required." });
    }

    // Find the existing package
    const existingPackage = await Package.findOne({ packageId });
    if (!existingPackage) {
      return res.status(404).json({ message: "❌ Package not found." });
    }

    // Upload helper (same as in addPackage)
    const uploadFromDisk = async (filePath) => {
      return await cloudinary.uploader.upload(filePath, { folder: "travel_packages" });
    };

    const updatedImages = {};

    // Upload any new images
    if (files) {
      for (const key of Object.keys(files)) {
        const file = files[key][0];
        const result = await uploadFromDisk(file.path);
        updatedImages[key] = result.secure_url;
      }
    }

    // Keep existing images if not replaced
    const finalImages = {
      thumbnail_url: updatedImages.thumbnail_url || existingPackage.thumbnail_url,
      img1: updatedImages.img1 || existingPackage.img1 || existingPackage.thumbnail_url,
      img2: updatedImages.img2 || existingPackage.img2,
      img3: updatedImages.img3 || existingPackage.img3,
    };

    // Ensure thumbnail is always present
    if (!finalImages.thumbnail_url) {
      return res.status(400).json({ message: "❌ Thumbnail image is required." });
    }

    // Update the package document
    existingPackage.packageName = packageName || existingPackage.packageName;
    existingPackage.packageDescription = packageDescription || existingPackage.packageDescription;
    existingPackage.price = price || existingPackage.price;
    existingPackage.thumbnail_url = finalImages.thumbnail_url;
    existingPackage.img1 = finalImages.img1;
    existingPackage.img2 = finalImages.img2;
    existingPackage.img3 = finalImages.img3;

    await existingPackage.save();

    res.status(200).json({
      message: "✅ Package updated successfully!",
      data: existingPackage,
    });

  } catch (error) {
    console.error("❌ Error updating package:", error);
    res.status(500).json({
      message: "Failed to update package",
      error: error.message,
    });
  }
};


// Delete Package
exports.deletePackage = async (req, res) => {
  try {
    const { packageId } = req.body;

    if (!packageId) {
      return res.status(400).json({ message: "❌ packageId is required." });
    }

    const existingPackage = await Package.findOne({ packageId });
    if (!existingPackage) {
      return res.status(404).json({ message: "❌ Package not found." });
    }

    // Optional: delete images from Cloudinary
    const imagesToDelete = [
      existingPackage.thumbnail_url,
      existingPackage.img1,
      existingPackage.img2,
      existingPackage.img3,
    ].filter(Boolean); // remove null/undefined

    for (const url of imagesToDelete) {
      // Extract public_id from URL
      const publicId = url.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`travel_packages/${publicId}`);
    }

    await existingPackage.deleteOne();

    res.status(200).json({
      message: "✅ Package deleted successfully",
      packageId,
    });
  } catch (error) {
    console.error("❌ Error deleting package:", error);
    res.status(500).json({
      message: "Failed to delete package",
      error: error.message,
    });
  }
};


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

    uploadedImages.img1 = uploadedImages.thumbnail_url

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




// Add testimonial with image upload
exports.addReview = async (req, res) => {
  try {
    const { person_name, rating, review, isVisible } = req.body;

    // Auto-generate testimonial ID
    const testimonial_Id = `post_${Date.now()}_${Math.floor(Math.random() * 10000)}`;


    // Validate required fields
    if (!person_name || !rating || !review) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if image exists
    if (!req.file) {
      return res.status(400).json({ message: 'No profile picture provided.' });
    }

    // Upload image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      public_id: testimonial_Id,
      folder: 'testimonial_profiles',
      overwrite: true,
    });

    // Save testimonial to MongoDB
    const newTestimonial = new Testimonial({
      testimonial_Id,
      profile_pic_url: uploadResult.secure_url,          // <— image URL
      profile_pic_public_id: uploadResult.public_id,     // <— Cloudinary ID (used for deletion)
      person_name,
      rating,
      review,
      isVisible: isVisible !== undefined ? isVisible : true,
    });

    const savedTestimonial = await newTestimonial.save();

    res.status(201).json({
      message: 'Testimonial added successfully!',
      data: savedTestimonial,
    });
  } catch (error) {
    console.error('Error adding testimonial:', error);
    res.status(500).json({
      message: 'Error adding testimonial',
      error: error.message,
    });
  }
};



exports.updateVisibility = async (req, res) => {
  try {
    const { testimonial_Id } = req.params; // testimonial ID from route
    const { isVisible } = req.body;        // new visibility value (true/false)

    // Validate inputs
    if (typeof isVisible === 'undefined') {
      return res.status(400).json({ message: 'isVisible value is required' });
    }

    // Update testimonial visibility
    const updatedTestimonial = await Testimonial.findOneAndUpdate(
      { testimonial_Id },
      { isVisible },
      { new: true }
    );

    if (!updatedTestimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    res.status(200).json({
      message: 'Visibility updated successfully',
      data: updatedTestimonial,
    });
  } catch (error) {
    console.error('Error updating visibility:', error);
    res.status(500).json({
      message: 'Failed to update visibility',
      error: error.message,
    });
  }
};




exports.deleteReview = async (req, res) => {
  try {
    const { testimonial_Id } = req.params;

    // Find the testimonial first
    const testimonial = await Testimonial.findOne({ testimonial_Id });
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    // Delete image from Cloudinary if it exists
    if (testimonial.profile_pic_public_id) {
      try {
        await cloudinary.uploader.destroy(testimonial.profile_pic_public_id);
      } catch (cloudErr) {
        console.error('Cloudinary deletion failed:', cloudErr.message);
      }
    }

    // Delete testimonial from MongoDB
    await Testimonial.deleteOne({ testimonial_Id });

    res.status(200).json({
      message: 'Testimonial and associated image deleted successfully',
      testimonial_Id,
    });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    res.status(500).json({
      message: 'Failed to delete testimonial',
      error: error.message,
    });
  }
};



exports.getAllReviews = async (req, res) => {
  try {
    // Optional query param ?visible=true or ?visible=false
    const { visible } = req.query;
    let filter = {};

    if (visible === 'true') filter.isVisible = true;
    else if (visible === 'false') filter.isVisible = false;

    // Fetch testimonials from MongoDB (sorted by newest first)
    const testimonials = await Testimonial.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      message: 'Testimonials fetched successfully',
      count: testimonials.length,
      data: testimonials,
    });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    res.status(500).json({
      message: 'Failed to fetch testimonials',
      error: error.message,
    });
  }
};