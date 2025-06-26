const express = require("express");
const OpenAI = require("openai");
require("dotenv").config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

router.post("/", async (req, res) => {
  const { prompt, tripType, locationType, destination, travelTime, budgetAmount, currency } = req.body;

  console.log("🌐 Incoming itinerary request:", req.body);

  // Detailed field check
  const missingFields = [];
  if (!prompt) missingFields.push("prompt");
  if (!tripType) missingFields.push("tripType");
  if (!locationType) missingFields.push("locationType");
  if (!destination) missingFields.push("destination");
  if (!travelTime) missingFields.push("travelTime");
  if (!budgetAmount) missingFields.push("budgetAmount");
  if (!currency) missingFields.push("currency");

  if (missingFields.length > 0) {
    console.error("❌ Missing fields:", missingFields);
    return res.status(400).json({ error: "Missing required fields", missingFields });
  }

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a professional travel planner." },
        { role: "user", content: prompt }
      ]
    });

    const itinerary = chatCompletion.choices[0].message.content;
    res.json({ itinerary });
  } catch (error) {
    console.error("🧨 OpenAI API Error:", error);
    res.status(500).json({ error: "❌ Failed to fetch itinerary. Please try again later." });
  }
});

module.exports = router;


