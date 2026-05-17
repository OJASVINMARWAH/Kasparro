require("dotenv").config();

const express = require("express");

const cors = require("cors");

const connectDB = require("./config/db");

const app = express();
app.use(cors({
    origin: "https://kasparro-eight.vercel.app",
    credentials: true
}));
// ROUTES
const caseRoutes = require("./routes/caseRoutes");

const aiRoutes = require('./routes/aiRoutes');

const evidenceRoutes = require("./routes/evidenceRoutes");

const visionRoutes = require('./routes/visionRoutes');


// DATABASE CONNECTION
connectDB();

const path = require("path");

// MIDDLEWARE
app.use(cors());

app.use(express.json());

// SERVE STATIC FILES
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// API ROUTES
app.use('/api/ai', aiRoutes);
app.use('/api/vision', visionRoutes);

app.use("/api/cases", caseRoutes);

app.use("/api/evidence", evidenceRoutes);

// HEALTH CHECK
app.get("/", (req, res) => {
    res.send("Aura Backend Running");
});

// SERVER
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
}

module.exports = app;