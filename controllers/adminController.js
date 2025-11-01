const Admin = require('../models/Admin');

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

    if (password!=admin.password)
    {
        return res.status(401).json({ msg: 'Invalid Password' });
    }

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


exports.updateAdmin = async (req, res) => {
  const {adminId, adminName, email, contact, password } = req.body;

  const updateFields = {adminId, adminName, email, contact, password };

  try {
    let admin = await Admin.findById(req.params.id);

    if (!admin) return res.status(404).json({ msg: 'Admin not found' });

    admin = await Admin.findByIdAndUpdate(req.params.id, { $set: updateFields }, { new: true });

    res.json(admin);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteAdmin = async (req, res) => {
  try {
    await Admin.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Admin removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


