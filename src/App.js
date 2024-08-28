import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = '63963c3abfb448909db91947242904';

  const handleSearch = () => {
    if (city.trim() === '') {
      alert('Please enter a city name');
      return;
    }

    setLoading(true);

    fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        return response.json();
      })
      .then(data => {
        setWeatherData(data);
        setLoading(false);
      })
      .catch(error => {
        alert('Failed to fetch weather data');
        setLoading(false);
        console.error('Error fetching weather data:', error);
      });
  };

  return (
    <div className="App bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4">
      <div className="search-container bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800 text-center">Check the weather</h1>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 w-full"
        >
          Search
        </button>
      </div>
      {loading && <p className="text-gray-700 mt-4">Loading data...</p>}
      {weatherData && (
        <div className="weather-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 w-full max-w-4xl">
          <div className="weather-card bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Temperature</h2>
            <p className="text-4xl text-blue-500">{weatherData.current.temp_c}°C</p>
          </div>
          <div className="weather-card bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Humidity</h2>
            <p className="text-4xl text-blue-500">{weatherData.current.humidity}%</p>
          </div>
          <div className="weather-card bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Condition</h2>
            <p className="text-4xl text-blue-500">{weatherData.current.condition.text}</p>
          </div>
          <div className="weather-card bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Wind Speed</h2>
            <p className="text-4xl text-blue-500">{weatherData.current.wind_kph} km/h</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
