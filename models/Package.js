const mongoose = require('mongoose');

const PackageSchema = new mongoose.Schema({
  name: String,
  country: String,
  image: String,
  price: Number,
  originalPrice: Number,
  duration: Number,
  nights: Number,
  rating: Number,
  ratingCount: String,
  cities: [String],
  activities: [String]
});

module.exports = mongoose.model('Package', PackageSchema);
