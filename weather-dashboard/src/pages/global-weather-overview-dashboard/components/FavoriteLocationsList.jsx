import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FavoriteLocationsList = () => {
  const [favoriteLocations, setFavoriteLocations] = useState([
    {
      id: 1,
      name: 'New York',
      country: 'United States',
      temp: '22°C',
      condition: 'Sunny',
      humidity: '65%',
      windSpeed: '12 km/h',
      trend: 'up',
      lastUpdated: '2 min ago',
      alerts: 0
    },
    {
      id: 2,
      name: 'London',
      country: 'United Kingdom',
      temp: '18°C',
      condition: 'Cloudy',
      humidity: '78%',
      windSpeed: '8 km/h',
      trend: 'down',
      lastUpdated: '1 min ago',
      alerts: 1
    },
    {
      id: 3,
      name: 'Tokyo',
      country: 'Japan',
      temp: '28°C',
      condition: 'Clear',
      humidity: '55%',
      windSpeed: '15 km/h',
      trend: 'up',
      lastUpdated: '3 min ago',
      alerts: 0
    },
    {
      id: 4,
      name: 'Sydney',
      country: 'Australia',
      temp: '16°C',
      condition: 'Rainy',
      humidity: '85%',
      windSpeed: '22 km/h',
      trend: 'stable',
      lastUpdated: '1 min ago',
      alerts: 2
    },
    {
      id: 5,
      name: 'Dubai',
      country: 'UAE',
      temp: '35°C',
      condition: 'Hot',
      humidity: '45%',
      windSpeed: '6 km/h',
      trend: 'up',
      lastUpdated: '4 min ago',
      alerts: 1
    },
    {
      id: 6,
      name: 'Mumbai',
      country: 'India',
      temp: '29°C',
      condition: 'Humid',
      humidity: '82%',
      windSpeed: '10 km/h',
      trend: 'stable',
      lastUpdated: '2 min ago',
      alerts: 0
    }
  ]);

  const getWeatherIcon = (condition) => {
    switch (condition?.toLowerCase()) {
      case 'sunny': case 'clear': return 'Sun';
      case 'cloudy': return 'Cloud';
      case 'rainy': return 'CloudRain';
      case 'hot': return 'Thermometer';
      case 'humid': return 'Droplets';
      default: return 'Sun';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return 'TrendingUp';
      case 'down': return 'TrendingDown';
      case 'stable': return 'Minus';
      default: return 'Minus';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-success';
      case 'down': return 'text-error';
      case 'stable': return 'text-text-secondary';
      default: return 'text-text-secondary';
    }
  };

  const removeFromFavorites = (locationId) => {
    setFavoriteLocations(prev => prev?.filter(location => location?.id !== locationId));
  };

  return (
    <div className="bg-surface border border-border rounded-lg h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-text-primary">Favorite Locations</h3>
          <Button variant="outline" size="sm" iconName="Plus">
            Add
          </Button>
        </div>
        <p className="text-sm text-text-secondary">
          {favoriteLocations?.length} locations monitored
        </p>
      </div>
      {/* Locations List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2 space-y-2">
          {favoriteLocations?.map((location) => (
            <div
              key={location?.id}
              className="p-4 border border-border rounded-lg hover:shadow-weather-interactive transition-all duration-200 group"
            >
              {/* Location Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon 
                      name={getWeatherIcon(location?.condition)} 
                      size={20} 
                      className="text-primary" 
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-text-primary">{location?.name}</h4>
                    <p className="text-xs text-text-secondary">{location?.country}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {location?.alerts > 0 && (
                    <div className="w-5 h-5 bg-warning rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-white">{location?.alerts}</span>
                    </div>
                  )}
                  <button
                    onClick={() => removeFromFavorites(location?.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-error/10 rounded"
                  >
                    <Icon name="X" size={14} className="text-error" />
                  </button>
                </div>
              </div>

              {/* Temperature and Trend */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-semibold text-text-primary">{location?.temp}</span>
                  <span className="text-sm text-text-secondary">{location?.condition}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon 
                    name={getTrendIcon(location?.trend)} 
                    size={16} 
                    className={getTrendColor(location?.trend)} 
                  />
                </div>
              </div>

              {/* Weather Details */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <Icon name="Droplets" size={14} className="text-text-secondary" />
                  <span className="text-sm text-text-secondary">{location?.humidity}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Wind" size={14} className="text-text-secondary" />
                  <span className="text-sm text-text-secondary">{location?.windSpeed}</span>
                </div>
              </div>

              {/* Last Updated */}
              <div className="flex items-center justify-between text-xs text-text-secondary">
                <span>Updated {location?.lastUpdated}</span>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                  <span>Live</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Footer Actions */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" fullWidth iconName="RefreshCw">
            Refresh All
          </Button>
          <Button variant="outline" size="sm" fullWidth iconName="Settings">
            Manage
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FavoriteLocationsList;