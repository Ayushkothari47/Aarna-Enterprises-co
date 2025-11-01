const mongoose = require('mongoose');
mongoose.set('strictQuery', false);


const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://ayush:1ysmatui5u@pikachu.vkroeww.mongodb.net/?appName=pikachu");

    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;