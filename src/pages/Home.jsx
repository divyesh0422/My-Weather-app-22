import { useEffect, useState } from "react";
import axios from "axios";

import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import ForecastList from "../components/ForecastList";
import UnitToggle from "../components/UnitToggle";

const apiKey = "084e0c70fe81bcf8ed6e35c4d1a4804c"; // Replace with your OpenWeatherMap API key

const getBackground = (condition, darkMode) => {
  if (darkMode) return "bg-gray-900";
  switch (condition) {
    case "Clear":
      return "bg-gradient-to-br from-yellow-300 via-blue-300 to-blue-600";
    case "Rain":
    case "Drizzle":
      return "bg-gradient-to-br from-gray-400 via-blue-500 to-gray-700";
    case "Thunderstorm":
      return "bg-gradient-to-br from-gray-600 via-black to-gray-800";
    case "Clouds":
      return "bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500";
    case "Snow":
      return "bg-gradient-to-br from-white via-blue-200 to-blue-400";
    default:
      return "bg-gradient-to-br from-blue-400 to-blue-600";
  }
};

const Home = ({ darkMode }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [unit, setUnit] = useState("metric");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch weather + forecast for city
  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`
      );
      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${unit}`
      );

      setWeatherData(weatherRes.data);
      setForecastData(forecastRes.data);
    } catch (err) {
      setError("City not found. Please try again.");
      setWeatherData(null);
      setForecastData(null);
    }
    setLoading(false);
  };

  // Fetch weather on unit change (if data already exists)
  useEffect(() => {
    if (weatherData?.name) {
      fetchWeather(weatherData.name);
    }
  }, [unit]);

  // Auto fetch weather by geolocation on mount
  useEffect(() => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const weatherRes = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`
          );
          const forecastRes = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`
          );
          setWeatherData(weatherRes.data);
          setForecastData(forecastRes.data);
          setError(null);
        } catch {
          setError("Unable to fetch weather for your location.");
        }
        setLoading(false);
      },
      () => {
        setLoading(false);
        setError("Location permission denied.");
      }
    );
  }, [unit]);

  const bgClass = getBackground(weatherData?.weather[0]?.main, darkMode);

  return (
    <div className={`${bgClass} min-h-screen p-6 flex flex-col bg-amber-950`}>
      <h1 className="text-center text-4xl font-bold mb-8 text-white drop-shadow-lg">
        My Weather Web App
      </h1>

      <div className="max-w-md mx-auto w-full flex flex-col gap-4">
        <SearchBar onSearch={fetchWeather} />
        <UnitToggle unit={unit} setUnit={setUnit} />
      </div>

      {loading && (
        <p className="text-center text-white mt-8 text-lg font-semibold">Loading...</p>
      )}

      {error && (
        <p className="text-center text-red-400 mt-8 font-semibold">{error}</p>
      )}

      {weatherData && !loading && (
        <>
          <WeatherCard data={weatherData} unit={unit} />
          <ForecastList forecast={forecastData} unit={unit} />
        </>
      )}
    </div>
  );
};

export default Home;
