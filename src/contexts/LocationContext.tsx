import React, { createContext, useContext, useState, useEffect } from 'react';

interface Location {
  latitude: number;
  longitude: number;
  region: string;
  state: string;
  district: string;
}

interface LocationContextType {
  currentLocation: Location | null;
  isLoading: boolean;
  error: string | null;
  updateLocation: () => Promise<void>;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLocationDetails = async (latitude: number, longitude: number) => {
    const apiKey = import.meta.env.VITE_OPENCAGE_API_KEY;

    if (!apiKey || apiKey === 'YOUR_API_KEY') {
      throw new Error('OpenCage API key is not configured. Please set VITE_OPENCAGE_API_KEY in your environment variables.');
    }

    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`
      );
      
      if (response.status === 401 || response.status === 403) {
        throw new Error('Invalid OpenCage API key. Please check your API key configuration.');
      }

      if (!response.ok) {
        throw new Error(`OpenCage API request failed with status: ${response.status}`);
      }

      const data = await response.json();

      if (data.status.code === 402) {
        throw new Error('OpenCage API quota exceeded. Please try again later.');
      }

      if (!data.results || !Array.isArray(data.results) || data.results.length === 0) {
        throw new Error('No location data found for these coordinates');
      }

      const result = data.results[0].components || {};
      
      return {
        latitude,
        longitude,
        region: result.state_district || result.county || 'Unknown Region',
        state: result.state || 'Unknown State',
        district: result.city || result.town || result.village || 'Unknown District'
      };
    } catch (error) {
      console.error('Error fetching location details:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to fetch location details from the geocoding service');
    }
  };

  const updateLocation = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by your browser');
      }

      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          resolve,
          (error: GeolocationPositionError) => {
            if (error.code === error.PERMISSION_DENIED) {
              reject(new Error('Location access was denied. To use location features, please enable location access in your browser settings and refresh the page.'));
            } else if (error.code === error.TIMEOUT) {
              reject(new Error('Location request timed out. Please check your connection and try again.'));
            } else if (error.code === error.POSITION_UNAVAILABLE) {
              reject(new Error('Unable to determine your location. Please check your device\'s location settings.'));
            } else {
              reject(new Error('An error occurred while trying to determine your location.'));
            }
          },
          {
            timeout: 60000,
            maximumAge: 0,
            enableHighAccuracy: true
          }
        );
      });

      const { latitude, longitude } = position.coords;
      const locationDetails = await fetchLocationDetails(latitude, longitude);
      setCurrentLocation(locationDetails);
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to get location. Please enable location services.';
      setError(errorMessage);
      console.error('Location error:', error);
      setCurrentLocation(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    updateLocation();
  }, []);

  return (
    <LocationContext.Provider value={{ currentLocation, isLoading, error, updateLocation }}>
      {children}
    </LocationContext.Provider>
  );
};