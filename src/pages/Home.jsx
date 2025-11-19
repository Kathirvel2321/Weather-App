import { React, useState } from "react";
import Background from "../components/Background";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setSearch(value);
    setError(""); // clear any old error

    if (value.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/search.json?key=0176994ea7f34070bbe70115251911&q=${value}`
      );
      const data = await res.json();

      if (Array.isArray(data) && data.length > 0) {
        setSuggestions(data);
      } else {
        setSuggestions([]);
      }
    } catch (err) {
      console.error("Suggestion fetch failed", err);
    }
  };
  const gosearch = async () => {
    const s = search.trim();
    if (!s) return;

    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=7beab58f6be64b40adf114737250111&q=${s}`
      );
      const data = await res.json();

      if (data.error) {
        setError("❌ City not found. Please enter a valid name.");
        return;
      }

      navigate(`/weather/${encodeURIComponent(s)}`);
      setSearch("");
      setSuggestions([]);
    } catch (err) {
      setError("⚠️ Unable to fetch data. Please try again later.");
    }
  };

  const onKey = (e) => {
    if (e.key === "Enter") {
      gosearch();
    }
  };

  return (
    <>
      <Background />

      <div className="home-page flex justify-center items-center md:gap-5 gap-1 flex-col h-screen overflow-hidden">
        <h1 className="md:text-5xl text-3xl font-bold text-white">Weatherly</h1>

        <p className="text-white/50 text-xs md:text-lg">
          Get real time weather updates with an immersive experience
        </p>

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
            onChange={handleInputChange}
            onKeyDown={onKey}
            placeholder="Search for a city"
            className="input-field bg-transparent border rounded-full md:px-32 md:py-2 px-16 py-1 inset-0 text-white animate-pulse"
          />

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <ul className="absolute top-full mt-2 bg-[#1a2730] text-white w-full rounded-2xl border border-white/10 shadow-lg max-h-56 overflow-y-auto z-50">
              {suggestions.map((s, i) => (
                <li
                  key={i}
                  onClick={() => {
                    navigate(`/weather/${encodeURIComponent(s.name)}`);
                    setSearch("");
                    setSuggestions([]);
                  }}
                  className="px-4 py-2 hover:bg-primary/30 cursor-pointer"
                >
                  {s.name},{" "}
                  <span className="text-white/60 text-xs">{s.country}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Error */}
          {error && (
            <p className="absolute top-10 text-red-400 text-sm mt-2 w-full text-center">
              {error}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
