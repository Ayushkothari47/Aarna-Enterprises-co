const express = require('express');
const connectDB = require('./config/db');
const adminRoutes = require('./routes/adminRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const packageRoutes = require('./routes/packageRoutes')

const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const app = express();
app.use(cors());

// Connect Database
connectDB();

// Middleware
app.use(bodyParser.json());
app.use('/gallery', galleryRoutes);
app.use('/package', packageRoutes)
app.use('/admin', adminRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


