import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';
import Select from './Select';

const Header = () => {
  const location = useLocation();
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [units, setUnits] = useState('metric');
  const [refreshInterval, setRefreshInterval] = useState('15');
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [hasAlerts, setHasAlerts] = useState(false);
  
  const preferencesRef = useRef(null);
  const searchRef = useRef(null);

  // Mock weather locations for search suggestions
  const [searchSuggestions] = useState([
    { id: 1, name: 'New York, NY', country: 'US', temp: '22°C' },
    { id: 2, name: 'London, UK', country: 'GB', temp: '18°C' },
    { id: 3, name: 'Tokyo, JP', country: 'JP', temp: '28°C' },
    { id: 4, name: 'Sydney, AU', country: 'AU', temp: '16°C' },
    { id: 5, name: 'Paris, FR', country: 'FR', temp: '20°C' },
  ]);

  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const unitOptions = [
    { value: 'metric', label: 'Metric (°C, km/h)' },
    { value: 'imperial', label: 'Imperial (°F, mph)' },
    { value: 'kelvin', label: 'Scientific (K, m/s)' }
  ];

  const refreshOptions = [
    { value: '5', label: '5 minutes' },
    { value: '10', label: '10 minutes' },
    { value: '15', label: '15 minutes' },
    { value: '30', label: '30 minutes' }
  ];

  // Handle search input changes
  const handleSearchChange = (e) => {
    const query = e?.target?.value;
    setSearchQuery(query);
    
    if (query?.length > 0) {
      const filtered = searchSuggestions?.filter(location =>
        location?.name?.toLowerCase()?.includes(query?.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  // Handle location selection
  const handleLocationSelect = (location) => {
    setSearchQuery(location?.name);
    setFilteredSuggestions([]);
    setIsSearchOpen(false);
  };

  // Handle preferences changes
  const handleUnitsChange = (value) => {
    setUnits(value);
    localStorage.setItem('weather-units', value);
  };

  const handleRefreshIntervalChange = (value) => {
    setRefreshInterval(value);
    localStorage.setItem('weather-refresh-interval', value);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (preferencesRef?.current && !preferencesRef?.current?.contains(event?.target)) {
        setIsPreferencesOpen(false);
      }
      if (searchRef?.current && !searchRef?.current?.contains(event?.target)) {
        setIsSearchOpen(false);
        setFilteredSuggestions([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Load preferences from localStorage
  useEffect(() => {
    const savedUnits = localStorage.getItem('weather-units');
    const savedInterval = localStorage.getItem('weather-refresh-interval');
    
    if (savedUnits) setUnits(savedUnits);
    if (savedInterval) setRefreshInterval(savedInterval);
  }, []);

  // Simulate data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
      // Simulate occasional connection issues
      setConnectionStatus(Math.random() > 0.1 ? 'connected' : 'reconnecting');
      // Simulate weather alerts
      setHasAlerts(Math.random() > 0.8);
    }, parseInt(refreshInterval) * 60 * 1000);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  const formatLastUpdate = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000 / 60);
    if (diff < 1) return 'Just now';
    if (diff < 60) return `${diff}m ago`;
    return date?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case 'connected': return 'text-success';
      case 'reconnecting': return 'text-warning';
      case 'disconnected': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <>
      {/* Weather Alert Banner */}
      {hasAlerts && (
        <div className="bg-warning/10 border-b border-warning/20 px-6 py-3">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-3">
              <Icon name="AlertTriangle" size={20} className="text-warning" />
              <div>
                <span className="text-sm font-medium text-warning">Severe Weather Alert</span>
                <span className="text-sm text-text-secondary ml-2">
                  Heavy rainfall warning for monitored locations
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setHasAlerts(false)}
              iconName="X"
              className="text-warning hover:text-warning/80"
            >
              Dismiss
            </Button>
          </div>
        </div>
      )}
      {/* Main Header */}
      <header className="bg-surface border-b border-border sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            {/* Logo and Brand */}
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="CloudSun" size={20} className="text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-text-primary">WeatherScope</h1>
                  <p className="text-xs text-text-secondary">Analytics Dashboard</p>
                </div>
              </Link>

              {/* Primary Navigation */}
              <nav className="hidden lg:flex items-center gap-1">
                <Link
                  to="/global-weather-overview-dashboard"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location?.pathname === '/global-weather-overview-dashboard' ?'bg-primary/10 text-primary' :'text-text-secondary hover:text-text-primary hover:bg-muted'
                  }`}
                >
                  Dashboard
                </Link>
              </nav>
            </div>

            {/* Right Side Controls */}
            <div className="flex items-center gap-4">
              {/* Data Status Indicator */}
              <div className="hidden md:flex items-center gap-2 text-xs text-text-secondary">
                <div className={`w-2 h-2 rounded-full ${
                  connectionStatus === 'connected' ? 'bg-success' :
                  connectionStatus === 'reconnecting'? 'bg-warning animate-pulse' : 'bg-error'
                }`} />
                <span className={getConnectionStatusColor()}>
                  {connectionStatus === 'connected' ? 'Live' : 
                   connectionStatus === 'reconnecting' ? 'Updating...' : 'Offline'}
                </span>
                <span className="text-text-secondary">•</span>
                <span>Updated {formatLastUpdate(lastUpdate)}</span>
              </div>

              {/* Location Search */}
              <div className="relative" ref={searchRef}>
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="Search locations..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onFocus={() => setIsSearchOpen(true)}
                    className="w-64 pl-10 pr-4"
                  />
                  <Icon 
                    name="Search" 
                    size={16} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
                  />
                </div>

                {/* Search Suggestions Dropdown */}
                {isSearchOpen && filteredSuggestions?.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-surface border border-border rounded-lg shadow-weather-interactive z-50 max-h-64 overflow-y-auto">
                    {filteredSuggestions?.map((location) => (
                      <button
                        key={location?.id}
                        onClick={() => handleLocationSelect(location)}
                        className="w-full px-4 py-3 text-left hover:bg-muted transition-colors flex items-center justify-between"
                      >
                        <div>
                          <div className="text-sm font-medium text-text-primary">{location?.name}</div>
                          <div className="text-xs text-text-secondary">{location?.country}</div>
                        </div>
                        <div className="text-sm font-data text-text-primary">{location?.temp}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Weather Preferences */}
              <div className="relative" ref={preferencesRef}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsPreferencesOpen(!isPreferencesOpen)}
                  iconName="Settings"
                  className="hidden md:flex"
                >
                  Preferences
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsPreferencesOpen(!isPreferencesOpen)}
                  iconName="Settings"
                  className="md:hidden"
                />

                {/* Preferences Dropdown */}
                {isPreferencesOpen && (
                  <div className="absolute top-full right-0 mt-1 w-80 bg-surface border border-border rounded-lg shadow-weather-interactive z-50 p-4">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-text-primary mb-3">Weather Preferences</h3>
                      </div>
                      
                      <div className="space-y-3">
                        <Select
                          label="Units"
                          options={unitOptions}
                          value={units}
                          onChange={handleUnitsChange}
                        />
                        
                        <Select
                          label="Data Refresh"
                          options={refreshOptions}
                          value={refreshInterval}
                          onChange={handleRefreshIntervalChange}
                        />
                      </div>

                      <div className="pt-3 border-t border-border">
                        <div className="flex items-center justify-between text-xs text-text-secondary">
                          <span>API Status</span>
                          <span className={getConnectionStatusColor()}>
                            {connectionStatus?.charAt(0)?.toUpperCase() + connectionStatus?.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden"
                iconName="Menu"
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;