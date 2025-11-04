const Api_Key = process.React_App_Weather_Key;

export const getWeatherByCity = async (city) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );
  return res.json();
};

export const getWeeklyWeather = async (lat, lon) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${API_KEY}&units=metric`
  );
  return res.json();
};