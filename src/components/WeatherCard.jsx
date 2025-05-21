const WeatherCard = ({ data, unit }) => {
  if (!data) return null;

  const tempUnit = unit === "metric" ? "°C" : "°F";

  return (
    <div className="bg-white/30 backdrop-blur-md rounded-xl p-6 shadow-lg max-w-md mx-auto text-center text-gray-900 dark:text-white">
      <h2 className="text-3xl font-bold">{data.name}, {data.sys.country}</h2>
      <p className="text-xl capitalize">{data.weather[0].description}</p>
      <img
        className="mx-auto"
        src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        alt={data.weather[0].description}
      />
      <p className="text-6xl font-extrabold">{Math.round(data.main.temp)}{tempUnit}</p>
      <p className="mt-2 text-sm">
        Feels like {Math.round(data.main.feels_like)}{tempUnit} | Humidity: {data.main.humidity}% | Wind: {Math.round(data.wind.speed)} {unit === "metric" ? "m/s" : "mph"}
      </p>
    </div>
  );
};

export default WeatherCard;
