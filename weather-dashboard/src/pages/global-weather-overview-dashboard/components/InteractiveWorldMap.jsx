import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InteractiveWorldMap = () => {
  const [activeLayer, setActiveLayer] = useState('temperature');
  const [selectedLocation, setSelectedLocation] = useState(null);

  const mapLayers = [
    { id: 'temperature', label: 'Temperature', icon: 'Thermometer', color: 'bg-red-500' },
    { id: 'precipitation', label: 'Precipitation', icon: 'CloudRain', color: 'bg-blue-500' },
    { id: 'wind', label: 'Wind Patterns', icon: 'Wind', color: 'bg-green-500' },
    { id: 'pressure', label: 'Pressure', icon: 'Gauge', color: 'bg-purple-500' }
  ];

  const weatherLocations = [
    { id: 1, name: 'New York', lat: 40.7128, lng: -74.0060, temp: '22°C', condition: 'Sunny', x: '25%', y: '35%' },
    { id: 2, name: 'London', lat: 51.5074, lng: -0.1278, temp: '18°C', condition: 'Cloudy', x: '50%', y: '30%' },
    { id: 3, name: 'Tokyo', lat: 35.6762, lng: 139.6503, temp: '28°C', condition: 'Clear', x: '85%', y: '40%' },
    { id: 4, name: 'Sydney', lat: -33.8688, lng: 151.2093, temp: '16°C', condition: 'Rainy', x: '88%', y: '75%' },
    { id: 5, name: 'Cairo', lat: 30.0444, lng: 31.2357, temp: '32°C', condition: 'Hot', x: '55%', y: '45%' },
    { id: 6, name: 'Mumbai', lat: 19.0760, lng: 72.8777, temp: '29°C', condition: 'Humid', x: '72%', y: '55%' }
  ];

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

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
  };

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      {/* Map Controls */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Global Weather Map</h3>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" iconName="ZoomIn">
              Zoom
            </Button>
            <Button variant="outline" size="sm" iconName="RotateCcw">
              Reset
            </Button>
          </div>
        </div>
        
        {/* Layer Toggle */}
        <div className="flex items-center gap-2 flex-wrap">
          {mapLayers?.map((layer) => (
            <button
              key={layer?.id}
              onClick={() => setActiveLayer(layer?.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeLayer === layer?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-text-secondary hover:text-text-primary hover:bg-muted/80'
              }`}
            >
              <div className={`w-3 h-3 rounded-full ${layer?.color}`} />
              <Icon name={layer?.icon} size={16} />
              <span>{layer?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Map Container */}
      <div className="relative h-96 bg-gradient-to-b from-blue-50 to-blue-100 overflow-hidden">
        {/* World Map Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-green-50 to-blue-100">
          {/* Simplified world map representation */}
          <svg className="w-full h-full" viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid slice">
            {/* Continents - simplified shapes */}
            <path
              d="M100 150 Q200 120 300 140 L350 160 Q400 150 450 170 L500 180 Q550 160 600 175 L650 185 Q700 170 750 180 L800 190 Q850 175 900 185 L950 195 L950 250 Q900 240 850 245 L800 250 Q750 235 700 240 L650 245 Q600 230 550 235 L500 240 Q450 225 400 230 L350 235 Q300 220 250 225 L200 230 Q150 215 100 220 Z"
              fill="#10B981"
              opacity="0.3"
              className="transition-opacity duration-300"
            />
            <path
              d="M200 250 Q300 230 400 250 L500 270 Q600 250 700 270 L800 290 Q850 275 900 285 L950 295 L950 350 Q900 340 850 345 L800 350 Q750 335 700 340 L650 345 Q600 330 550 335 L500 340 Q450 325 400 330 L350 335 Q300 320 250 325 L200 330 Z"
              fill="#F59E0B"
              opacity="0.2"
              className="transition-opacity duration-300"
            />
          </svg>
        </div>

        {/* Weather Location Markers */}
        {weatherLocations?.map((location) => (
          <div
            key={location?.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            style={{ left: location?.x, top: location?.y }}
            onClick={() => handleLocationClick(location)}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
              selectedLocation?.id === location?.id
                ? 'bg-primary scale-125 shadow-lg'
                : 'bg-surface border-2 border-primary hover:scale-110 shadow-md'
            }`}>
              <Icon 
                name={getWeatherIcon(location?.condition)} 
                size={16} 
                className={selectedLocation?.id === location?.id ? 'text-primary-foreground' : 'text-primary'} 
              />
            </div>
            
            {/* Location Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <div className="bg-text-primary text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap">
                <div className="font-medium">{location?.name}</div>
                <div className="text-gray-300">{location?.temp} • {location?.condition}</div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-text-primary"></div>
              </div>
            </div>
          </div>
        ))}

        {/* Active Layer Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {activeLayer === 'temperature' && (
            <div className="w-full h-full bg-gradient-to-r from-blue-500/20 via-yellow-500/20 to-red-500/20 animate-pulse" />
          )}
          {activeLayer === 'precipitation' && (
            <div className="w-full h-full bg-gradient-to-b from-transparent via-blue-500/30 to-blue-700/20" />
          )}
          {activeLayer === 'wind' && (
            <div className="w-full h-full">
              {/* Wind pattern indicators */}
              <div className="absolute top-1/4 left-1/4 w-8 h-1 bg-green-500/60 rotate-45 animate-pulse" />
              <div className="absolute top-1/3 left-1/2 w-6 h-1 bg-green-500/60 rotate-12 animate-pulse delay-100" />
              <div className="absolute top-1/2 left-3/4 w-10 h-1 bg-green-500/60 -rotate-12 animate-pulse delay-200" />
            </div>
          )}
        </div>
      </div>
      {/* Selected Location Details */}
      {selectedLocation && (
        <div className="p-4 border-t border-border bg-muted/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name={getWeatherIcon(selectedLocation?.condition)} size={20} className="text-primary" />
              <div>
                <h4 className="font-medium text-text-primary">{selectedLocation?.name}</h4>
                <p className="text-sm text-text-secondary">
                  {selectedLocation?.temp} • {selectedLocation?.condition}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" iconName="Star">
                Add to Favorites
              </Button>
              <Button variant="outline" size="sm" iconName="ExternalLink">
                View Details
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveWorldMap;