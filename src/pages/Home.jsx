import React from "react";
import Background from "../components/background";

const Home = () => {
  return (
    <>
      <Background />

      <div className="home-page flex justify-center items-center md:gap-5 gap-1 flex-col h-screen overflow-hidden">
        <h1 className="md:text-5xl text-3xl font-bold text-white">Weatherly</h1>

        <p className="text-white/50 text-xs md:text-lg">
          Get real time weather updates with an immersive experience
        </p>

        <div className="flex items-center justify-center mt-5 md:mt-0"
             style={{ position: "relative"}}>

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
            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>

          <input
            type="text"
            className="input-field bg-transparent border rounded-full md:px-32 md:py-2 px-16 py-1 inset-0 text-white animate-pulse"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
