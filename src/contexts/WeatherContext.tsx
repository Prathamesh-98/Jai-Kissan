import React, { createContext, useContext, useState, useEffect } from 'react';
import OpenWeatherMap from 'openweathermap-ts';
import { useAuth } from './AuthContext';

const openWeather = new OpenWeatherMap({
  apiKey: import.meta.env.VITE_WEATHER_API_KEY
});

interface WeatherData {
  location: string;
  current: {
    temp: number;
    humidity: number;
    windSpeed: number;
    condition: string;
    icon: string;
  };
  forecast: Array<{
    date: string;
    maxTemp: number;
    minTemp: number;
    condition: string;
    icon: string;
    precipitation: number;
  }>;
  farmingAdvice: string;
}

interface WeatherContextType {
  weatherData: WeatherData | null;
  isLoading: boolean;
  error: string | null;
  updateLocation: (location: string) => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};

const getFarmingAdvice = (weather: any): string => {
  if (!weather?.main) {
    return 'Unable to generate farming advice due to incomplete weather data.';
  }

  const temp = weather.main.temp;
  const humidity = weather.main.humidity;
  const windSpeed = weather.wind.speed;
  const condition = weather.weather?.[0]?.main?.toLowerCase() || '';

  if (condition.includes('rain')) {
    return 'Rainfall expected. Consider postponing outdoor activities and ensure proper drainage in fields.';
  }

  if (temp > 35) {
    return 'High temperatures expected. Ensure adequate irrigation and consider protective measures for crops.';
  }

  if (humidity > 80) {
    return 'High humidity conditions. Monitor for potential fungal diseases in crops.';
  }

  if (windSpeed > 20) {
    return 'Strong winds expected. Secure any loose equipment and monitor tall crops.';
  }

  return 'Weather conditions are favorable for most farming activities.';
};

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useAuth();

  const fetchWeatherData = async (lat: number, lon: number) => {
    try {
      const currentWeather = await openWeather.getCurrentWeatherByGeoCoordinates(lat, lon);
      const forecast = await openWeather.getThreeHourForecastByGeoCoordinates(lat, lon);

      // Add safety checks for currentWeather data
      if (!currentWeather || !currentWeather.main || !currentWeather.weather?.[0]) {
        throw new Error('Incomplete weather data received');
      }

      // Add safety check for forecast.list
      const forecastList = forecast?.list || [];
      
      const processedForecast = forecastList
        .filter((item: any, index: number) => index % 8 === 0) // Get one reading per day
        .slice(0, 5) // Get 5 days forecast
        .map((item: any) => {
          if (!item?.main || !item?.weather?.[0]) {
            return null;
          }
          return {
            date: new Date(item.dt * 1000).toISOString(),
            maxTemp: Math.round(item.main.temp_max),
            minTemp: Math.round(item.main.temp_min),
            condition: item.weather[0].main,
            icon: item.weather[0].icon,
            precipitation: Math.round((item.pop || 0) * 100)
          };
        })
        .filter(Boolean); // Remove any null entries

      setWeatherData({
        location: currentWeather.name || 'Unknown Location',
        current: {
          temp: Math.round(currentWeather.main.temp),
          humidity: currentWeather.main.humidity,
          windSpeed: Math.round(currentWeather.wind.speed * 3.6), // Convert m/s to km/h
          condition: currentWeather.weather[0].main,
          icon: currentWeather.weather[0].icon
        },
        forecast: processedForecast,
        farmingAdvice: getFarmingAdvice(currentWeather)
      });
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError('Failed to fetch weather data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherData(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('Geolocation error:', error);
          setError('Unable to get your location. Please enable location services.');
          setIsLoading(false);
        },
        {
          timeout: 60000,
          maximumAge: 0,
          enableHighAccuracy: true
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
    }
  }, [currentUser?.location]);

  const updateLocation = (newLocation: string) => {
    setIsLoading(true);
    // For simplicity, we're using the current location's coordinates
    // In a production app, you'd want to geocode the location string
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherData(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('Geolocation error:', error);
          setError('Unable to get your location. Please enable location services.');
          setIsLoading(false);
        },
        {
          timeout: 60000,
          maximumAge: 0,
          enableHighAccuracy: true
        }
      );
    }
  };

  const value = {
    weatherData,
    isLoading,
    error,
    updateLocation
  };

  return <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>;
};