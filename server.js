const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const packageRoutes = require("./routes/packageRoutes"); // ✅ Existing route
const itineraryChat = require("./routes/itineraryChat"); // ✅ NEW: Itinerary route

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Enable CORS for frontend
app.use(cors());

app.use(express.json());

// ✅ MongoDB Atlas connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch((err) => console.error("❌ MongoDB Atlas Connection Failed:", err));

// ✅ Use routes
app.use("/api", packageRoutes);
app.use("/api/itinerary-chat", itineraryChat);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
