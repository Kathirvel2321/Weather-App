import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Searchbtn from "../components/Searchbtn";
import {
  WiDaySunny,
  WiNightClear,
  WiDayCloudy,
  WiNightCloudy,
  WiCloud,
  WiCloudy,
  WiRain,
  WiRainWind,
  WiShowers,
  WiThunderstorm,
  WiLightning,
  WiSnow,
  WiSleet,
  WiFog,
  WiWindy,
  WiHot,
  WiDirectionUp,
  WiDirectionDown,
} from "react-icons/wi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
} from "recharts";

const Weather = () => {

  const { city: cityparam } = useParams();
  const [city, setCity] = useState(cityparam || "Mumbai");

  useEffect(() => {
    if (cityparam && cityparam !== city) {
      setCity(cityparam);
    }
  }, [cityparam]);

  const API_KEY = "7beab58f6be64b40adf114737250111";
  const [data, setdata] = useState(null);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(
          city
        )}&days=7`;
        const res = await fetch(url);
        const json = await res.json();
        if (json.error) {
          // handle not-found or other API errors gracefully
          console.error("Weather API error:", json.error);
          setdata(null);
          return;
        }
        setdata(json);
        console.log("✅ Weather Data:", json);
      } catch (err) {
        console.error("Fetch error:", err);
        setdata(null);
      }
    };
    fetchdata();
  }, [city]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDayName = (date) => {
    const d = new Date(date);
    return days[d.getDay()];
  };
  const weathericon = (item) => {
    const condition = item.current
      ? item.current.condition.text.toLowerCase() // ✅ for today's weather
      : item.day.condition.text.toLowerCase(); // ✅ for forecast days

    if (condition.includes("rain"))
      return <WiRain className="iconrain text-6xl text-blue-400" />;
    if (condition.includes("cloud"))
      return <WiCloud className="iconcloud text-6xl text-gray-300" />;
    if (condition.includes("sun") || condition.includes("clear"))
      return <WiDaySunny className="iconsunny text-6xl text-yellow-300" />;
    if (condition.includes("thunder"))
      return (
        <WiThunderstorm className="iconthunder text-6xl text-purple-600" />
      );
    if (condition.includes("snow"))
      return <WiSnow className="iconsnow text-6xl text-white" />;
    if (condition.includes("fog") || condition.includes("mist"))
      return <WiFog className="iconfog text-6xl text-gray-400" />;
    if (condition.includes("wind"))
      return <WiWindy className="iconwindy text-6xl text-green-400" />;
    if (condition.includes("hot"))
      return <WiHot className="iconhot text-6xl text-red-500" />;
    if (condition.includes("sleet"))
      return <WiSleet className="iconsleet text-6xl text-blue-200" />;
    if (condition.includes("showers"))
      return <WiShowers className="iconshowers text-6xl text-blue-300" />;
    if (condition.includes("lightning"))
      return <WiLightning className="iconlightning text-6xl text-yellow-600" />;

    return <WiDaySunny className="iconsunny text-6xl text-yellow-300" />; // default
  };
  const simplifyCondition = (text) => {
    const t = text.toLowerCase();

    if (t.includes("rain")) return "Rain";
    if (t.includes("drizzle")) return "Rain";
    if (t.includes("shower")) return "Rain";
    if (t.includes("thunder")) return "Thunder";
    if (t.includes("storm")) return "Storm";
    if (t.includes("sun")) return "Sunny";
    if (t.includes("clear")) return "Clear";
    if (t.includes("cloud")) return "Cloudy";
    if (t.includes("mist")) return "Mist";
    if (t.includes("fog")) return "Fog";
    if (t.includes("snow")) return "Snow";
    if (t.includes("sleet")) return "Sleet";
    if (t.includes("hot")) return "Hot";
    if (t.includes("wind")) return "Windy";

    return "Normal"; // fallback
  };

  return (
    <>
      <div className="bg-[#101c22] h-screen overflow-auto  ">
        <div className="relative mt-5 flex justify-center w-full ">
          <Searchbtn />
        </div>
        <div className="header  w-full flex justify-between px-8 md:px-32 py-5 md:py-10 h-[20%] relative">
          <div className="relative">
            <h1 className="text-white md:text-6xl text-3xl font-bold">
              {data.location.name}
            </h1>
            <p className="text-white/60 md:text-xl text-lg md:py-2 ">
              {new Date(data.location.localtime).toLocaleDateString("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>

          <div className=" md:w-32 w-26 h-20 rounded-2xl bg-white/5 border border-white/10 grid grid-cols-2 ">
            <span className="row-span-2 flex items-center justify-center ">
              {weathericon(data)}
            </span>
            <p className="flex items-end md:text-3xl text-2xl text-white font-bold justify-center">
              {Math.floor(data.current.temp_f)}°
            </p>
            <p className=" text-xs relative group cursor-pointer text-white scale-y-125 -mt-1 flex items-start justify-start px-3">
              {simplifyCondition(data.current.condition.text)}

              <span className="absolute top-6  -translate-x-1/2 bg-black/40 text-white/80 text-[10px] px-2 py-[2px] rounded-md opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-200 whitespace-nowrap border border-white/10">
                {data.current.condition.text}
              </span>
            </p>
          </div>
        </div>

        <div className="w-full md:h-56 gap-5 sm:overflow-hidden px-10 pt-2 overflow-auto flex justify-evenly items-end md:px-28 md:pt-10 ">
          {data.forecast.forecastday.map((day) => {
            const dayName = getDayName(day.date);
            const todayName = getDayName(new Date());

            return (
              <div
                key={day.date}
                className={`boxes ${
                  dayName === todayName ? "today-active" : ""
                }`}
              >
                <p className="week">{getDayName(day.date)}</p>
                <span className="weather">{weathericon(day)}</span>
                <span className="degree">{day.day.maxtemp_f}°</span>
                <span className="deg">{day.day.mintemp_f}°</span>
              </div>
            );
          })}
        </div>
        <div className=" w-full flex justify-center mt-10 mb-5">
          <div className="chartboard flex flex-col">
            <h1 className="md:text-2xl text-base text-white/80 font-semibold">
              Weekly Temperature Trend
            </h1>
            <div className=" mt-5">
              <span className=" text-white md:text-6xl text-2xl font-semibold ">
                {data.current.temp_f}°
              </span>
              <span className="relative group px-4  md:text-xl text-green-400 cursor-pointer">
                <WiDirectionUp className="inline-block scale-y-150" />
                {Math.round(data.forecast.forecastday[0].day.maxtemp_f)}° &nbsp;
                <WiDirectionDown className="inline-block scale-y-150" />
                {Math.round(data.forecast.forecastday[0].day.mintemp_f)}°
                &nbsp;Today
                {/* Tooltip */}
                <span className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/30 text-white/80 text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-200 whitespace-nowrap">
                  Today's max & min temperature
                </span>
              </span>
            </div>
            <div className="w-full md:w-full  rounded-2xl md:p-4 md:mt-5">
              <ResponsiveContainer width="100%" height={250}>
                <LineChart
                  data={data.forecast.forecastday}
                  margin={{ top: 10, right: 25, left: 25, bottom: 0 }}
                >
                  <Area
                    type="natural"
                    dataKey="day.maxtemp_f"
                    stroke="none"
                    fill="url(#weatherGradient)"
                    fillOpacity={0.15}
                  />
                  <defs>
                    <linearGradient
                      id="weatherGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#00c6ff" stopOpacity="0.8" />
                      <stop
                        offset="100%"
                        stopColor="#006bff"
                        stopOpacity="0.1"
                      />
                    </linearGradient>
                  </defs>

                  <Line
                    type="natural"
                    dataKey="day.maxtemp_f"
                    stroke="url(#weatherGradient)"
                    strokeWidth={5}
                    dot={false}
                    activeDot={{ r: 6 }}
                    className="chart-glow"
                  />

                  <XAxis
                    dataKey={(day) =>
                      new Date(day.date).toLocaleDateString("en-US", {
                        weekday: "short",
                      })
                    }
                    tick={{ fill: "#aaa", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    interval="preserveStartEnd"
                  />

                  <YAxis
                    hide={true}
                    domain={[
                      (dataMin) => Math.floor(dataMin - 5),
                      (dataMax) => Math.ceil(dataMax + 5),
                    ]}
                  />
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Weather;
