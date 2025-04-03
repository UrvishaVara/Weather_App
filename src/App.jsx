import { NativeSelect } from '@mantine/core';
import React from 'react'
import { useState } from 'react';

const API_KEY = '2a6f641e4c0ec37cd05efd6fd332e224';

const locationData = [
  {
    city: "Rajkot",
    lat: "22.3039",
    lon: "70.8022"
  },
  {
    city: "Ahemdabad",
    lat: "23.0225",
    lon: "72.5714"
  }
]

const App = () => {
  const [weatherData, setWeatherData] = useState({});
  const [city, setCity] = useState('')

  const selectCity = async (event) => {
    const value = event.target.value;
    if (value === "Choose Here") {
      setCity('')
    } else {
      setCity(value);
    }
    const xyz = locationData.find((ele) => event.target.value === ele.city);
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${xyz?.lat}&lon=${xyz?.lon}&appid=${API_KEY}`);
      const data = await response.json();
      setWeatherData(data);
    }
    catch (err) {
      console.log(err);
    }
  }

  const formateTime = (timeZone) => {
    const date = new Date(timeZone * 1000);
    const amPm = date.getHours() > 12 ? 'pm' : 'am';
    const hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    return `${hour}:${minute}:${second} ${amPm}`
  }

  return (
    <div >
      <div className="text-white p-6 min-h-screen space-y-5 flex flex-col justify-center items-center bg-[url('./weather.jpg')] bg-cover" >
        <NativeSelect onChange={selectCity} label="Select City" data={['Choose Here', 'Rajkot', 'Ahemdabad']} className='!w-full !max-w-4xl' />
        {
          city !== "" ? (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 max-w-4xl w-full bg-gradient-to-r from-blue-600 rounded-lg shadow-xl">
            <div className="bg-white bg-opacity-30 p-4 rounded-lg text-center shadow-lg">
              <h2 className="text-2xl font-bold">{weatherData?.name}</h2>
              <p className="text-xl">Weather: {weatherData?.weather?.[0]?.description}</p>
              <p className="text-lg">Wind: {weatherData?.wind?.speed} km/h</p>
            </div>

            <div className="bg-white bg-opacity-30 p-4 rounded-lg text-center shadow-lg">
              <h2 className="text-2xl font-bold">Sunrise</h2>
              <p className="text-xl">{formateTime(weatherData?.sys?.sunrise)}</p>
            </div>

            <div className="bg-white bg-opacity-30 p-4 rounded-lg text-center shadow-lg">
              <h2 className="text-2xl font-bold">Sunset</h2>
              <p className="text-xl">{formateTime(weatherData?.sys?.sunset)}</p>
            </div>

            <div className="bg-white bg-opacity-30 p-4 rounded-lg text-center shadow-lg">
              <h2 className="text-2xl font-bold">Coordinates</h2>
              <p className="text-lg">Latitude: {weatherData?.coord?.lat}</p>
              <p className="text-lg">Longitude: {weatherData?.coord?.lon}</p>
            </div>

            <div className="bg-white bg-opacity-30 p-4 rounded-lg text-center shadow-lg">
              <h2 className="text-2xl font-bold">Humidity</h2>
              <p className="text-xl">{weatherData?.main?.humidity}%</p>
            </div>
          </div>) : (<div>Please select a city</div>)
        }
      </div>
    </div>
  );
}

export default App