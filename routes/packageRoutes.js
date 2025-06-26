const express = require('express');
const router = express.Router();
const Package = require('../models/Package');
const { getCurrencyRates, getCurrencySymbol } = require('../utils/currencyUtils');

router.get('/packages', async (req, res) => {
  try {
    const currency = req.query.currency || 'INR';
    const rates = await getCurrencyRates();
    const rate = rates[currency] || 1;
    const symbol = getCurrencySymbol(currency);

    const packages = await Package.find();

    const convertedPackages = packages.map(pkg => ({
      ...pkg._doc,
      price: Math.round(pkg.price * rate),
      originalPrice: Math.round(pkg.originalPrice * rate),
      currencySymbol: symbol,
    }));

    res.json(convertedPackages);
  } catch (error) {
    console.error("❌ Error in GET /api/packages:", error.message);
    res.status(500).json({ message: 'Failed to fetch packages' });
  }
});

module.exports = router;
