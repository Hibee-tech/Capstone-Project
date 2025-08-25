import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Search, AlertCircle, Cloud, Sun, CloudRain, CloudSnow } from 'lucide-react';
import axios from 'axios';

const GlobalWeatherOverviewDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get weather icon based on condition
  const getWeatherIcon = (condition) => {
    const conditionLower = condition?.toLowerCase() || '';
    if (conditionLower?.includes('rain') || conditionLower?.includes('drizzle')) {
      return <CloudRain className="w-12 h-12 text-blue-500" />;
    } else if (conditionLower?.includes('snow')) {
      return <CloudSnow className="w-12 h-12 text-blue-300" />;
    } else if (conditionLower?.includes('cloud')) {
      return <Cloud className="w-12 h-12 text-gray-500" />;
    } else {
      return <Sun className="w-12 h-12 text-yellow-500" />;
    }
  };

  const fetchWeatherData = async (cityName) => {
    const API_KEY = import.meta.env?.VITE_OPENWEATHERMAP_API_KEY;
    
    if (!API_KEY || API_KEY === 'your-openweathermap-api-key-here') {
      throw new Error('OpenWeatherMap API key not configured. Please add VITE_OPENWEATHERMAP_API_KEY to your .env file.');
    }

    const response = await axios?.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric`
    );

    return {
      city: response?.data?.name || cityName,
      country: response?.data?.sys?.country || '',
      temperature: Math.round(response?.data?.main?.temp) || 0,
      condition: response?.data?.weather?.[0]?.description || 'Unknown',
      humidity: response?.data?.main?.humidity || 0,
      windSpeed: Math.round(response?.data?.wind?.speed * 3.6) || 0, // Convert m/s to km/h
      pressure: response?.data?.main?.pressure || 0,
      feelsLike: Math.round(response?.data?.main?.feels_like) || 0,
      visibility: Math.round((response?.data?.visibility || 0) / 1000), // Convert to km
      icon: response?.data?.weather?.[0]?.main || 'Clear'
    };
  };

  const handleSearch = async (e) => {
    e?.preventDefault();
    if (!searchQuery?.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchWeatherData(searchQuery?.trim());
      setWeatherData(data);
    } catch (err) {
      console.error('Weather API Error:', err);
      
      if (err?.response?.status === 404) {
        setError('City not found. Please check the spelling and try again.');
      } else if (err?.response?.status === 401) {
        setError('Invalid API key. Please check your OpenWeatherMap API configuration.');
      } else if (err?.message?.includes('API key not configured')) {
        setError(err?.message);
      } else {
        setError('Failed to fetch weather data. Please try again later.');
      }
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Weather Dashboard - Search Current Weather Conditions</title>
        <meta name="description" content="Search for current weather conditions in any city worldwide with our clean and simple weather dashboard interface powered by OpenWeatherMap." />
        <meta name="keywords" content="weather dashboard, weather search, current weather, city weather, weather conditions, OpenWeatherMap" />
      </Helmet>
      <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center px-4">
        <div className="w-full max-w-2xl mx-auto">
          {/* Main Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
              Weather Dashboard
            </h1>
            <p className="text-base sm:text-lg text-gray-600 font-normal">
              Search for current weather conditions in any city
            </p>
          </div>

          {/* Search Container */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 mb-8">
            <form 
              onSubmit={handleSearch} 
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
            >
              <input
                type="text"
                placeholder="Enter city name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                className="flex-1 px-4 py-3 text-base sm:text-lg border-0 outline-none bg-transparent text-gray-900 placeholder-gray-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !searchQuery?.trim()}
                className="h-12 w-full sm:w-12 bg-[#60a5fa] hover:bg-[#3b82f6] disabled:opacity-50 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-colors duration-200"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Search className="w-5 h-5 text-white" />
                )}
              </button>
            </form>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8 animate-fade-in">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Weather Results */}
          {weatherData && !error && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 animate-fade-in">
              <div className="text-center">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1">
                  {weatherData?.city}
                  {weatherData?.country && (
                    <span className="text-base sm:text-lg text-gray-500 ml-2">
                      {weatherData?.country}
                    </span>
                  )}
                </h2>
                
                <div className="flex items-center justify-center mb-4">
                  {getWeatherIcon(weatherData?.icon)}
                </div>
                
                <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                  {weatherData?.temperature}°C
                </div>
                <p className="text-base sm:text-lg text-gray-600 mb-6 capitalize">
                  {weatherData?.condition}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Feels like</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {weatherData?.feelsLike}°C
                    </p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Humidity</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {weatherData?.humidity}%
                    </p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Wind Speed</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {weatherData?.windSpeed} km/h
                    </p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Pressure</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {weatherData?.pressure} hPa
                    </p>
                  </div>
                </div>

                {weatherData?.visibility > 0 && (
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-500">
                      Visibility: <span className="font-medium text-gray-700">{weatherData?.visibility} km</span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Empty State Message */}
          {!weatherData && !isLoading && !error && (
            <div className="text-center py-6 sm:py-8">
              <p className="text-gray-500 text-sm sm:text-base">
                Enter a city name to get live weather conditions powered by OpenWeatherMap
              </p>
            </div>
          )}

          {/* API Attribution */}
          <div className="text-center mt-6">
            <p className="text-xs text-gray-400">
              Weather data provided by{' '}
              <a 
                href="https://openweathermap.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 transition-colors"
              >
                OpenWeatherMap
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default GlobalWeatherOverviewDashboard;
