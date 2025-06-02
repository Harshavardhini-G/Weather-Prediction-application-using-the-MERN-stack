const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Define the schema directly here
const weatherSchema = new mongoose.Schema({
  city: String,
  country: String,
  temperature: Number,
  condition: String,
  feels_like: Number,
  humidity: Number,
  wind_speed: Number,
  unit: { type: String, default: "°C" },
  wind_unit: { type: String, default: "m/s" },
  timestamp: { type: Date, default: Date.now }
});

// Create the model here
const Weather = mongoose.model("Weather", weatherSchema);

// GET route to fetch weather data
router.get("/get-weather", async (req, res) => {
  try {
    const weatherData = await Weather.find();
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching weather data" });
  }
});

// POST route to save weather data
router.post("/", async (req, res) => {
  try {
    const {
      city,
      country,
      temp,
      description,
      feels_like,
      humidity,
      wind_speed
    } = req.body;

    const weather = new Weather({
      city,
      country,
      temperature: temp,
      condition: description,
      feels_like,
      humidity,
      wind_speed
    });

    await weather.save();
    res.status(201).json({ message: "Weather data saved successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error saving weather data", error });
  }
});

module.exports = router;
