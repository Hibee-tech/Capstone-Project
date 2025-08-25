import React from 'react';
import Icon from '../../../components/AppIcon';

const WeatherKPICard = ({ title, value, unit, change, changeType, icon, color, description }) => {
  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-error';
    return 'text-text-secondary';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 hover:shadow-weather-interactive transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
          <Icon name={icon} size={24} className="text-white" />
        </div>
        <div className="flex items-center gap-1 text-sm">
          <Icon name={getChangeIcon()} size={16} className={getChangeColor()} />
          <span className={getChangeColor()}>{change}</span>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-text-secondary">{title}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-semibold text-text-primary">{value}</span>
          {unit && <span className="text-sm text-text-secondary">{unit}</span>}
        </div>
        {description && (
          <p className="text-xs text-text-secondary">{description}</p>
        )}
      </div>
    </div>
  );
};

export default WeatherKPICard;