import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import md5 from "md5";
const __dirname = path.resolve();
const dotEnv = dotenv.config();
import User from "./models/userModel.js";

// console.log(md5("message"));

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/userss");
    console.log("db is Connected");
  } catch (error) {
    console.log("db is not Connected");
    console.log(error);
    console.exit(1);
  }
};

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/./views/index.html"));
});

app.post("/register", async (req, res) => {
  try {
    const newUser = new User({
      email: req.body.email,
      password: md5(req.body.password),
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = md5(req.body.password);
    const user = await User.findOne({ email: email });
    if (user && user.password === password) {
      res.status(200).json({ status: "valid user" });
    } else {
      res.status(404).json({ status: "Not valid user" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// route not found error
app.use((req, res, next) => {
  res.status(404).json({
    message: "Route not found",
  });
});
// handling server error
app.use((err, req, res, next) => {
  res.status(500).json({
    message: "Something broke",
  });
});

app.listen(PORT, async () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  await connectDB();
});
