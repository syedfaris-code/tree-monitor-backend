import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Use environment variable for MongoDB
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/tree-monitor";
mongoose.connect(mongoURI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Define Schema & Model
const treeSchema = new mongoose.Schema({
  treeId: String,
  date: String,
  height: Number,
  branches: Number,
  fruits: Number,
  canopyRadius: Number,
});
const Tree = mongoose.model("Tree", treeSchema);

// ✅ API endpoint
app.post("/api/trees", async (req, res) => {
  try {
    const tree = new Tree(req.body);
    await tree.save();
    res.json({ success: true, message: "Tree saved successfully!" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🌳 Server running on port ${PORT}`));
