const express = require('express');
const connectDB = require('./config/db');
const adminRoutes = require('./routes/adminRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const packageRoutes = require('./routes/packageRoutes');
const cmsRoutes = require('./routes/cmsRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const publicContentRoutes = require('./routes/publicContentRoutes');
const emailRoutes = require('./routes/emailRoutes');

const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Connect Database
connectDB();

// Middleware
app.use(bodyParser.json());
app.use('/gallery', galleryRoutes);
app.use('/package', packageRoutes)
app.use('/admin', adminRoutes);
app.use('/CMS', cmsRoutes);
app.use('/booking', bookingRoutes);
app.use('/siteContent', publicContentRoutes);
app.use('/email', emailRoutes);


const PORT = 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


