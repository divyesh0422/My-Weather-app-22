const ForecastList = ({ forecast, unit }) => {
  if (!forecast) return null;

  const tempUnit = unit === "metric" ? "°C" : "°F";

  // Filter 12:00 PM data for next 5 days
  const daily = forecast.list.filter(item => item.dt_txt.includes("12:00:00"));

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8 max-w-4xl mx-auto">
      {daily.map((day) => (
        <div key={day.dt} className="bg-white/20 backdrop-blur-md rounded-lg p-4 text-center text-gray-900 dark:text-white shadow-lg">
          <p className="font-semibold">{new Date(day.dt_txt).toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}</p>
          <img
            src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
            alt={day.weather[0].description}
            className="mx-auto"
          />
          <p className="capitalize">{day.weather[0].description}</p>
          <p className="font-bold text-lg">{Math.round(day.main.temp)}{tempUnit}</p>
        </div>
      ))}
    </div>
  );
};

export default ForecastList;
