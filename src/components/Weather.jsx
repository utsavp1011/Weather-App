import React, { useEffect, useState, useRef } from "react";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import humidity_icon from "../assets/humidity.png";
import "./Weather.css";

const Weather = () => {

  const inputRef = useRef()
  const [weatherData, setWeatherData] = useState(true);

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };
  
     const search = async (city) => {
  if (city === "") {
    alert("Enter City Name");
  }

  try {
     const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=ab7a55e92c5d735ff03b9c9180652131`;

    const response = await fetch(url);
    const data = await response.json();

    console.log(data);
    const icon = allIcons[data.weather[0].icon] || clear_icon;

    setWeatherData({
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      temprature: Math.floor(data.main.temp),
      location: data.name,
      icon: icon,
    });

  } catch (error) {
    console.log(error);
  }
};



  useEffect(() => {
    search("New York");
  }, []);

  return (
    <div className="weather">
      <div className="serch-bar">
        <input ref={inputRef} type="text" placeholder="search" />
        <img src={search_icon} alt="" onClick={()=> search(inputRef.current.value)}/>
      </div>
      <img src={cloud_icon} alt="" className="weather-icon"></img>
      <p className="temprature">{weatherData.temprature}°c</p>
      <p className="location">{weatherData.location}</p>

      <div className="weather-data">
        <div className="col">
          <img src={humidity_icon} alt=""></img>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p>{weatherData.humidity}%</p>
            <span>Humidity</span>
          </div>
        </div>

        <div className="col">
          <img src={wind_icon} alt=""></img>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p>{weatherData.windSpeed} km/h</p>
            <span>wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;