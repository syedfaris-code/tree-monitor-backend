import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Schema
const treeSchema = new mongoose.Schema({
  treeId: String,
  height: Number,
  branches: Number,
  fruits: Number,
  canopyRadius: Number,
  date: { type: Date, default: Date.now }
});
const Tree = mongoose.model("Tree", treeSchema);

// Default route (for testing)
app.get("/", (req, res) => {
  res.send("Tree Monitor Backend is running!");
});

// API route
app.post("/api/trees", async (req, res) => {
  try {
    const newTree = new Tree(req.body);
    await newTree.save();
    res.status(201).json({ message: "Tree data saved successfully", data: newTree });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving tree data", error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
