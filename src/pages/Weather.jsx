import React from "react";

const Weather = () => {
  return (
    <>
      <div className="bg-[#101c22] h-screen overflow-auto  ">
        <div className="header md:w-full flex justify-between px-32 py-10 h-[20%] relative ">
            <div className="relative">
                <h1 className="text-white text-6xl font-bold"> Sasn France </h1>
                <p className="text-white/60 text-xl py-2 "> Sunday, 24 july</p>
            </div>
            <div className=" w-28 h-20 rounded-2xl bg-white/5 border border-white/10 grid grid-cols-2">
                <span className="row-span-2 "></span>
                <p className="flex items-end text-2xl text-white font-bold">75</p>
                <p className=" text-white scale-y-125 -mt-2 ">sunny</p>
            </div>
        </div>
        <div className="w-full h-56 flex justify-evenly items-end px-28 pt-10 ">
            <div className="boxes"><p className="week">MON</p> <span className="weather">wea</span> <span className="degree">deg</span> <span className="deg">deg</span></div>
            <div className="boxes"><p className="week">TUE</p> <span className="weather">wea</span> <span className="degree">deg</span> <span className="deg">deg</span></div>
            <div className="boxes"><p className="week">WED</p> <span className="weather">wea</span> <span className="degree">deg</span> <span className="deg">deg</span></div>
            <div className="boxes"><p className="week">THU</p> <span className="weather">wea</span> <span className="degree">deg</span> <span className="deg">deg</span></div>
            <div className="boxes"><p className="week">FRI</p> <span className="weather">wea</span> <span className="degree">deg</span> <span className="deg">deg</span></div>
            <div className="boxes"><p className="week">SAT</p> <span className="weather">wea</span> <span className="degree">deg</span> <span className="deg">deg</span></div>
            <div className="boxes"><p className="week">SUN</p> <span className="weather">wea</span> <span className="degree">deg</span> <span className="deg">deg</span></div>
        </div>
        <div className=" w-full flex justify-center mt-10 mb-5">
        <div className="chartboard flex flex-col">
          <h1 className="text-2xl text-white/80 font-semibold">Weekly Temperature Trend</h1>
          <div className=" mt-5">
            <span className=" text-white text-6xl font-semibold ">72</span>
            <span className="px-10 items-center text-xl text-green-400">+5 this week</span>
          </div>
          <div className="chart">

          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default Weather;
