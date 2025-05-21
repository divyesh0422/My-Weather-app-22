function Header({ darkMode, setDarkMode }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">🌤️ WeatherNow</h1>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded shadow-md"
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
    </div>
  );
}

export default Header;
