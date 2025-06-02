require('dotenv').config();  // Make sure dotenv is loaded

const axios = require('axios');

const apiKey = process.env.WEATHER_API_KEY;

const getWeather = async (req, res) => {
  const city = req.query.city;
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching weather data' });
  }
};

module.exports = { getWeather };
