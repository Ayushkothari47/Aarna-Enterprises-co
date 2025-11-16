const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function(req, res, next) {
  const token = req.header('x-auth-token'); // make sure to send it like this
  console.log("Token Received: ", token);

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, "12cae28ed0c46e6fbfaff7eda7bde316fcc95158f34d32497e448504d8b383f7351e102fa3c2b723ecff2e23dc3dbede3bc1132f0e885119a06e92640011afa4");
    console.log(decoded);
    req.admin = decoded.admin; // use 'admin', not 'user'
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
