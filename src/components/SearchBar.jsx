// components/SearchBar.jsx
import { useState } from "react";
import { Search, MapPin } from "lucide-react";

export default function SearchBar({ onSearch, onUseMyLocation }) {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setQuery("");
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center justify-between gap-2 w-full max-w-md mx-auto px-4 py-2 bg-white/10 dark:bg-white/5 rounded-2xl shadow-lg border-red-900 transition-all"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search city, country..."
        className="flex-1 bg-transparent text-white placeholder-gray-300 focus:outline-none px-2 text-base "
      />
      <button
        type="submit"
        title="Search"
        className="text-white hover:text-blue-400 transition-colors"
      >
        <Search className="w-5 h-5" />
      </button>
      <button
        type="button"
        title="Use My Location"
        onClick={onUseMyLocation}
        className="text-white hover:text-emerald-400 transition-colors"
      >
        <MapPin className="w-5 h-5" />
      </button>
    </form>
  );
}
