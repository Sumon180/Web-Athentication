import mongoose from "mongoose";
import encrypt from "mongoose-encryption";
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

const encKey = process.env.ENC_KEY;

// encrypt password
userSchema.plugin(encrypt, {
  secret: encKey,
  encryptedFields: ["password"],
});

export default mongoose.model("user", userSchema);
