import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("user", userSchema);
