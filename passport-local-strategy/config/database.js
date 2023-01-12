require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/passportTestDB");
    console.log("db is Connected");
  } catch (error) {
    console.log("db is not Connected");
    console.log(error);
    console.exit(1);
  }
};

module.exports = connectDB;
