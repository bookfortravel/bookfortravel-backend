const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },  // was missing earlier
  price: { type: Number, required: true },
  duration: { type: String, required: true },
  highlights: [String],
  image: { type: String, required: true }, // ✅ match actual field
});


const Package = mongoose.model("Package", packageSchema);

module.exports = Package;
