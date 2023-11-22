// Weather.js
import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const Weather = ({ username }) => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchCityFromFirestore = async () => {
      try {
        const userDocRef = doc(db, "users", username);
        console.log("userDocRef:", userDocRef);

        const userDocSnapshot = await getDoc(userDocRef);
        console.log("userDocSnapshot:", userDocSnapshot);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          console.log("userData:", userData);

          const userCity = userData?.city || "";
          setCity(userCity);
          console.log("userCity:", userCity);

          if (userCity) {
            // Make API calls and set weather data
            const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=5ffdc66d9eb63ec59f26ed5d004069ba`;
            const currentWeatherResponse = await fetch(currentWeatherUrl);
            const currentWeatherData = await currentWeatherResponse.json();
            const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${userCity}&appid=5ffdc66d9eb63ec59f26ed5d004069ba`;
            const forecastResponse = await fetch(forecastUrl);
            const forecastData = await forecastResponse.json();
            setWeatherData({
              current: currentWeatherData,
              forecast: forecastData,
            });
          } else {
            console.error("User document does not contain a city");
          }
        } else {
          console.error("User document not found for username:", username);
        }
      } catch (error) {
        console.error("Error fetching city from Firestore:", error.message);
      }
    };

    fetchCityFromFirestore();
  }, [username]);

  return (
    <div>
      <h2>Weather for {city}</h2>
      {weatherData && (
        <>
          <h3>Current Weather</h3>
          <pre>{JSON.stringify(weatherData.current, null, 2)}</pre>

          <h3>Weather Forecast</h3>
          <pre>{JSON.stringify(weatherData.forecast, null, 2)}</pre>
        </>
      )}
    </div>
  );
};

export default Weather;
