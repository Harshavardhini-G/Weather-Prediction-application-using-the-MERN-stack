import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#121212" : "#e0f7fa";
  }, [darkMode]);

  const fetchWeather = async () => {
    if (!query.trim()) {
      setError("Please enter a city name.");
      setWeather(null);
      return;
    }

    setError("");
    setWeather(null);
    setLoading(true);

    try {
      let response;

      try {
        // Try the proxy server route first
        response = await axios.get(`/api/weather?q=${encodeURIComponent(query)}`);
      } catch (proxyError) {
        console.log("Proxy server error, falling back to direct API call:", proxyError);

        // Fall back to direct OpenWeatherMap API
        const apiKey = process.env.REACT_APP_WEATHER_API_KEY || "f6531f663314f5adc029bf314637abfb";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(query)}&units=metric&appid=${apiKey}`;
        response = await axios.get(url);
      }

      console.log("Weather data received:", response.data);
      setWeather(response.data);

      // Send weather data to backend
      await axios.post("http://localhost:5000/api/weather"
, {
        city: response.data.name,
        country: response.data.sys.country,
        temp: response.data.main.temp,
        description: response.data.weather[0].description,
        feels_like: response.data.main.feels_like,
        humidity: response.data.main.humidity,
        wind_speed: response.data.wind.speed
      });

      setLoading(false);
    } catch (err) {
      console.error("Weather API error:", err);
      if (err.response && err.response.status === 404) {
        setError("");
      } else {
        setError(""); // Clear any old error message after success

      }
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className={`App ${darkMode ? "dark" : "light"}`}>
      <header className="App-header">
        <h1>🌤️ Weather Prediction</h1>

        <button onClick={toggleDarkMode} className="dark-toggle">
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>

        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            placeholder="Enter city name (e.g., Chennai, Delhi)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="city-input"
          />
          <button type="submit" className="search-btn">
            Search
          </button>
        </form>

        {loading && <p className="loading">Loading weather data...</p>}
        {error && <p className="error-msg">{error}</p>}

        {weather && (
          <div className="weather-card">
            <h2>
              {weather.name}, {weather.sys.country}
            </h2>
            <div className="weather-main">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                alt={weather.weather[0].description}
              />
              <div className="temp-info">
                <p className="temp">{Math.round(weather.main.temp)}°C</p>
                <p className="desc">{weather.weather[0].description}</p>
              </div>
            </div>
            <div className="details">
              <p>Feels Like: {Math.round(weather.main.feels_like)}°C</p>
              <p>Humidity: {weather.main.humidity}%</p>
              <p>Wind Speed: {weather.wind.speed} m/s</p>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
