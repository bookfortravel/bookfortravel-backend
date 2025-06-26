const express = require('express');
const router = express.Router();
const { Configuration, OpenAIApi } = require('openai');

// ✅ 1. Configure OpenAI with your API key
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// ✅ 2. Helper: Get symbol based on currency
const getCurrencySymbol = (currency) => {
  const symbols = {
    INR: '₹', USD: '$', EUR: '€', GBP: '£', AED: 'د.إ',
    JPY: '¥', SGD: 'S$', THB: '฿', ZAR: 'R'
  };
  return symbols[currency] || '₹';
};

// ✅ 3. Helper: Convert INR to selected currency
const getConvertedPrice = (priceInINR, currency) => {
  const rates = {
    INR: 1, USD: 0.012, EUR: 0.011, GBP: 0.0098,
    AED: 0.044, JPY: 1.75, SGD: 0.016, THB: 0.44, ZAR: 0.21
  };
  const converted = priceInINR * (rates[currency] || 1);
  return converted.toFixed(0);
};

// ✅ 4. Create Prompt for OpenAI
const generateItineraryPrompt = ({ tripType, destination, travelTime, budgetAmount, locationType, currency }) => {
  const symbol = getCurrencySymbol(currency);
  const convertedBudget = getConvertedPrice(budgetAmount, currency);

  return `Create a 4-day, precise, day-wise travel itinerary for a ${tripType} trip to ${destination} during ${travelTime} with a per person budget of ${symbol}${convertedBudget}.

The travelers want ${locationType} experiences. Keep each day around 2–3 lines (~300 characters max). Use short, crisp language and return in ${currency}.

For each day, include:
- Top places to visit
- Unique or offbeat local experiences
- Food suggestions (if space permits)

End the response with:
“You can also try BookForTravel's amazing and immersive Host-Led Group Tours — explore unexplored places, connect with locals, try regional cuisine, and form lifelong friendships with fellow travelers.”

📞 Click ‘Try it now’ to request a call back from a BookForTravel Expert within 6 hours.`;
};

// ✅ 5. Route to trigger OpenAI
router.post('/generate-itinerary', async (req, res) => {
  const { tripType, destination, travelTime, budgetAmount, locationType, currency } = req.body;

  const prompt = generateItineraryPrompt({ tripType, destination, travelTime, budgetAmount, locationType, currency });

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const result = completion.data.choices[0].message.content;
    res.json({ itinerary: result });
  } catch (err) {
    console.error('OpenAI Error:', err.message);
    res.status(500).json({ error: 'Itinerary generation failed' });
  }
});

module.exports = router;
