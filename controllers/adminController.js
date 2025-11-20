const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const SECRET_KEY = "12cae28ed0c46e6fbfaff7eda7bde316fcc95158f34d32497e448504d8b383f7351e102fa3c2b723ecff2e23dc3dbede3bc1132f0e885119a06e92640011afa4"; // use env in production

// Admin methods
exports.registerAdmin = async (req, res) => {
  const { adminName, email, contact, password } = req.body;

  const adminId = Math.random().toString(36).substring(2, 12).toUpperCase();


  try {
    let admin = await Admin.findOne({ email });

    if (admin) {
      return res.status(400).json({ msg: 'Admin already exists' });
    }

    admin = new Admin({ adminId, adminName, email, contact, password });

    await admin.save();
    res.status(200).json({ msg: 'Registered Successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  console.log("login req as admin", req.body)

  try {
    let admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ msg: 'Invalid Email' });
    }

    if (password != admin.password) {
      return res.status(401).json({ msg: 'Invalid Password' });
    }

    // Create JWT payload
    const payload = {
      admin: {
        id: admin._id,
        role: 'admin'
      }
    };

    // Sign JWT
    jwt.sign(
      payload,
      SECRET_KEY,
      { expiresIn: '1h' }, // token expires in 1 hour
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ token });
      }
    );

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


exports.fetchAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().sort({ createdAt: -1 }); // newest first

    return res.status(200).json({
      success: true,
      count: admins.length,
      data: admins,
    });
  } catch (error) {
    console.error("Error fetching admins:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch admins",
      error: error.message,
    });
  }
};




