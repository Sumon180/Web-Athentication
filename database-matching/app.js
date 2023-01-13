import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
const __dirname = path.resolve();
const dotEnv = dotenv.config();
import User from "./models/userModel.js";

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

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/./views/index.html"));
});

app.post("/register", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
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

app.listen(port, async () => {
  console.log(`Server is running at http://localhost:${port}`);
  await connectDB();
});
