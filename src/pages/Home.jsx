import {React, useEffect} from "react";

const Home = () => {
  useEffect(() => {
    const move = e => {
      document.documentElement.style.setProperty("--x", e.clientX + "px");
      document.documentElement.style.setProperty("--y", e.clientY + "px");
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div>
      <div className="home-page  h-screen w-screen">
        <div className="dots w-full h-full flex justify-center items-center gap-5 flex-col">
        <h1 className="text-5xl font-bold text-white">Weatherly</h1>
        <p className="text-white/50 text-">
          Get real time weather updates with an immersive experience
        </p>
        <div style={{ position: "relative", maxWidth: 420, width: "100%" }}>
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
            className="input-field bg-transparent border rounded-full px-32 py-2  inset-0 text-white animate-pulse"/>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Home;
