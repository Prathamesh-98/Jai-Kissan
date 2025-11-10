import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, CloudRain, CloudSun, Sun, CloudDrizzle, MapPin } from 'lucide-react';
import Card from '../ui/Card';
import { useWeather } from '../../contexts/WeatherContext';
import { format } from 'date-fns';

const WeatherCard: React.FC = () => {
  const { weatherData, isLoading, error } = useWeather();
  
  if (isLoading) {
    return (
      <Card className="p-6 h-64 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-16 w-16 bg-gray-200 rounded-full mb-4"></div>
          <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
        </div>
      </Card>
    );
  }
  
  if (error) {
    return (
      <Card className="p-6 text-center">
        <p className="text-error-500 mb-2">Error loading weather data</p>
        <p className="text-sm text-gray-500">{error}</p>
      </Card>
    );
  }
  
  if (!weatherData) {
    return (
      <Card className="p-6 text-center">
        <p className="text-gray-500">No weather data available</p>
      </Card>
    );
  }
  
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return <Sun size={40} className="text-accent-500" />;
      case 'clouds':
        return <CloudSun size={40} className="text-accent-400" />;
      case 'rain':
        return <CloudRain size={40} className="text-primary-400" />;
      case 'drizzle':
        return <CloudDrizzle size={40} className="text-primary-400" />;
      default:
        return <Cloud size={40} className="text-gray-400" />;
    }
  };
  
  return (
    <Card className="overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-gray-800">Weather Forecast</h3>
              <div className="flex items-center text-sm text-gray-500">
                <MapPin size={14} className="mr-1" />
                {weatherData.location}
              </div>
            </div>
            
            <div className="flex items-center mt-4">
              {getWeatherIcon(weatherData.current.condition)}
              <div className="ml-4">
                <p className="text-3xl font-bold">{weatherData.current.temp}°C</p>
                <p className="text-gray-600">{weatherData.current.condition}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-primary-50 rounded-lg p-3">
                <span className="text-sm text-gray-500">Humidity</span>
                <p className="text-lg font-semibold">{weatherData.current.humidity}%</p>
              </div>
              <div className="bg-primary-50 rounded-lg p-3">
                <span className="text-sm text-gray-500">Wind</span>
                <p className="text-lg font-semibold">{weatherData.current.windSpeed} km/h</p>
              </div>
            </div>
          </div>
          
          <div className="bg-primary-50 p-4 rounded-lg max-w-xs">
            <p className="text-sm text-primary-800 font-medium mb-2">Farming Advisory</p>
            <p className="text-sm text-gray-600">{weatherData.farmingAdvice}</p>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-100">
        <div className="p-4">
          <h4 className="text-sm font-medium text-gray-700 mb-4">5-Day Forecast</h4>
          <div className="grid grid-cols-5 gap-4">
            {weatherData.forecast.map((day, index) => (
              <motion.div 
                key={index}
                className="bg-gray-50 rounded-lg p-4 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <p className="text-sm font-medium text-gray-700 mb-2">
                  {format(new Date(day.date), 'EEE, MMM d')}
                </p>
                <div className="my-2">{getWeatherIcon(day.condition)}</div>
                <div className="flex justify-center items-center gap-2 text-sm">
                  <span className="font-medium text-gray-900">{day.maxTemp}°</span>
                  <span className="text-gray-500">{day.minTemp}°</span>
                </div>
                <div className="mt-2 text-sm">
                  <span className="text-primary-600">
                    {day.precipitation > 0 ? `${day.precipitation}% rain` : 'No rain'}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WeatherCard;