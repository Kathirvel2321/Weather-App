import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_KEY = "7beab58f6be64b40adf114737250111";

const Searchbtn = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState("");

  // 🔹 Fetch location suggestions dynamically
  useEffect(() => {
    if (search.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const res = await fetch(
          `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${search}`
        );
        const data = await res.json();
        setSuggestions(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching suggestions:", err);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 400);
    return () => clearTimeout(debounce);
  }, [search]);

  // 🔹 Handle search on Enter or click
  const gosearch = async () => {
    const s = search.trim();
    if (!s) return;

    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${s}`
      );
      const data = await res.json();

      if (data.error) {
        setError("❌ City not found. Please try again.");
        setSuggestions([]);
        return;
      }

      navigate(`/weather/${encodeURIComponent(s)}`);
      setSearch("");
      setSuggestions([]);
      setError("");
    } catch (err) {
      setError("⚠️ Unable to fetch data. Try again later.");
    }
  };

  // 🔹 Handle Enter key
  const onKey = (e) => {
    if (e.key === "Enter") gosearch();
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      <div
          className="flex items-center justify-center mt-5 md:mt-0"
          style={{ position: "relative" }}
          >
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 24 24"
          style={{
            position: "absolute",
            left: 12,
            top: "50%",
            transform: "translateY(-50%)",
            width: 20,
            height: 20,
            color: "#6b7280",
            pointerEvents: "none",
            zIndex: 20,
          }}
        >
          <path
            d="M21 21l-4.35-4.35"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <circle
            cx="11"
            cy="11"
            r="6"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>

        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setError("");
          }}
          onKeyDown={onKey}
          placeholder="Search for a city"
          className="input-field1 bg-transparent border rounded-lg md:px-32 md:py-2 px-16 py-1 inset-0 text-white placeholder:text-white/50"
        />
      </div>

      {/* 🔹 Suggestions dropdown */}
      {suggestions.length > 0 && (
        <ul className="absolute top-full mt-2 bg-[#1a2730] text-white rounded-lg border border-white/10 shadow-lg w-72 md:w-96 max-h-56 overflow-y-auto z-50">
          {suggestions.map((s, i) => (
            <li
              key={i}
              onClick={() => {
                navigate(`/weather/${encodeURIComponent(s.name)}`);
                setSearch("");
                setSuggestions([]);
              }}
              className="px-4 py-2 cursor-pointer hover:bg-primary/30"
            >
              {s.name}, <span className="text-white/60 text-xs">{s.country}</span>
            </li>
          ))}
        </ul>
      )}

      {/* 🔹 Error message */}
      {error && (
        <p className="absolute top-full mt-2 text-red-400 text-sm text-center">
          {error}
        </p>
      )}
    </div>
  );
};

export default Searchbtn;
