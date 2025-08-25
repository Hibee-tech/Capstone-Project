import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WeatherDistributionChart = () => {
  const [chartType, setChartType] = useState('conditions');
  
  const weatherConditionsData = [
    { name: 'Sunny/Clear', value: 35, color: '#F59E0B', icon: 'Sun' },
    { name: 'Partly Cloudy', value: 28, color: '#6B7280', icon: 'CloudSun' },
    { name: 'Cloudy', value: 18, color: '#9CA3AF', icon: 'Cloud' },
    { name: 'Rainy', value: 12, color: '#3B82F6', icon: 'CloudRain' },
    { name: 'Stormy', value: 4, color: '#7C3AED', icon: 'CloudLightning' },
    { name: 'Snowy', value: 3, color: '#E5E7EB', icon: 'CloudSnow' }
  ];

  const temperatureRangesData = [
    { name: 'Hot (>30°C)', value: 22, color: '#EF4444', icon: 'Thermometer' },
    { name: 'Warm (20-30°C)', value: 35, color: '#F59E0B', icon: 'Sun' },
    { name: 'Mild (10-20°C)', value: 28, color: '#10B981', icon: 'Leaf' },
    { name: 'Cool (0-10°C)', value: 12, color: '#3B82F6', icon: 'Snowflake' },
    { name: 'Cold (<0°C)', value: 3, color: '#6366F1', icon: 'Thermometer' }
  ];

  const humidityLevelsData = [
    { name: 'Very High (>80%)', value: 15, color: '#3B82F6', icon: 'Droplets' },
    { name: 'High (60-80%)', value: 32, color: '#06B6D4', icon: 'Droplets' },
    { name: 'Moderate (40-60%)', value: 38, color: '#10B981', icon: 'Droplets' },
    { name: 'Low (20-40%)', value: 12, color: '#F59E0B', icon: 'Droplets' },
    { name: 'Very Low (<20%)', value: 3, color: '#EF4444', icon: 'Droplets' }
  ];

  const getCurrentData = () => {
    switch (chartType) {
      case 'conditions': return weatherConditionsData;
      case 'temperature': return temperatureRangesData;
      case 'humidity': return humidityLevelsData;
      default: return weatherConditionsData;
    }
  };

  const getChartTitle = () => {
    switch (chartType) {
      case 'conditions': return 'Global Weather Conditions Distribution';
      case 'temperature': return 'Global Temperature Ranges Distribution';
      case 'humidity': return 'Global Humidity Levels Distribution';
      default: return 'Weather Distribution';
    }
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-surface border border-border rounded-lg p-3 shadow-weather-interactive">
          <div className="flex items-center gap-2 mb-2">
            <Icon name={data?.icon} size={16} className="text-primary" />
            <span className="font-medium text-text-primary">{data?.name}</span>
          </div>
          <div className="text-sm text-text-secondary">
            <div>Percentage: {data?.value}%</div>
            <div>Locations: ~{Math.round(data?.value * 2.5)} cities</div>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 mt-4">
        {payload?.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div 
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: entry?.color }}
            />
            <Icon name={entry?.payload?.icon} size={14} className="text-text-secondary flex-shrink-0" />
            <span className="text-text-secondary truncate">{entry?.value}</span>
            <span className="text-text-primary font-medium ml-auto">
              {entry?.payload?.value}%
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">{getChartTitle()}</h3>
          <p className="text-sm text-text-secondary mt-1">
            Real-time distribution across {getCurrentData()?.reduce((sum, item) => sum + Math.round(item?.value * 2.5), 0)} monitored locations
          </p>
        </div>
        
        {/* Chart Type Selector */}
        <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
          <button
            onClick={() => setChartType('conditions')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              chartType === 'conditions' ?'bg-surface text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Icon name="Sun" size={16} className="mr-2" />
            Conditions
          </button>
          <button
            onClick={() => setChartType('temperature')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              chartType === 'temperature' ?'bg-surface text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Icon name="Thermometer" size={16} className="mr-2" />
            Temperature
          </button>
          <button
            onClick={() => setChartType('humidity')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              chartType === 'humidity' ?'bg-surface text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Icon name="Droplets" size={16} className="mr-2" />
            Humidity
          </button>
        </div>
      </div>
      {/* Chart Container */}
      <div className="h-80 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={getCurrentData()}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={2}
              dataKey="value"
            >
              {getCurrentData()?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry?.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-border">
        <div className="text-center">
          <div className="text-2xl font-semibold text-text-primary">
            {getCurrentData()?.length}
          </div>
          <div className="text-sm text-text-secondary">Categories</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-semibold text-text-primary">
            {getCurrentData()?.reduce((sum, item) => sum + Math.round(item?.value * 2.5), 0)}
          </div>
          <div className="text-sm text-text-secondary">Total Locations</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-semibold text-text-primary">
            {Math.max(...getCurrentData()?.map(item => item?.value))}%
          </div>
          <div className="text-sm text-text-secondary">Highest Share</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-semibold text-success">
            98.2%
          </div>
          <div className="text-sm text-text-secondary">Data Quality</div>
        </div>
      </div>
      {/* Export Actions */}
      <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t border-border">
        <Button variant="outline" size="sm" iconName="Download">
          Export Data
        </Button>
        <Button variant="outline" size="sm" iconName="Share2">
          Share Chart
        </Button>
      </div>
    </div>
  );
};

export default WeatherDistributionChart;