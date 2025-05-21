 const UnitToggle = ({ unit, setUnit }) => {
  return (
    <div className="flex items-center space-x-4 justify-center mt-4">
      <button
        onClick={() => setUnit("metric")}
        className={`px-4 py-2 m-3 rounded-md font-semibold ${unit === "metric" ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-700"}`}
      >
        °C
      </button>
      <button
        onClick={() => setUnit("imperial")}
        className={`px-4 py-2 rounded-md font-semibold ${unit === "imperial" ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-700"}`}
      >
        °F
      </button>
    </div>
  );
};

export default UnitToggle;
