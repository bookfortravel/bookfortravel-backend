const axios = require('axios');

let cachedRates = {};
let lastFetched = null;

async function getCurrencyRates() {
  const now = new Date();

  if (!lastFetched || now - lastFetched > 12 * 60 * 60 * 1000) {
    try {
      const response = await axios.get('https://open.er-api.com/v6/latest/INR');

      if (response.data && response.data.result === 'success') {
        cachedRates = response.data.rates || response.data.conversion_rates;
        lastFetched = new Date();
        console.log("✅ Currency rates updated from open.er-api.com");
      } else {
        throw new Error("Invalid API response structure");
      }
    } catch (err) {
      console.error("❌ Failed to fetch currency rates:", err.message);

      // Fallback static rates
      cachedRates = {
        INR: 1,
        USD: 0.0117,
        EUR: 0.0104,
        AED: 0.0429,
        THB: 0.3889,
        VND: 302.74,
        GBP: 0.0088,
        JPY: 1.70,
        SGD: 0.0152,
        ZAR: 0.2112,
      };
      console.log("⚠️ Using fallback currency rates.");
    }
  }

  return cachedRates;
}

function getCurrencySymbol(code) {
  const symbols = {
    INR: '₹',
    USD: '$',
    EUR: '€',
    AED: 'د.إ',
    THB: '฿',
    VND: '₫',
    GBP: '£',
    JPY: '¥',
    SGD: 'S$',
    ZAR: 'R',
  };

  return symbols[code] || '₹';
}

module.exports = {
  getCurrencyRates,
  getCurrencySymbol,
};

