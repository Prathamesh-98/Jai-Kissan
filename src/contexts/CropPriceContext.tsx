import React, { createContext, useContext, useState, useEffect } from 'react';

interface CropPrice {
  id: string;
  name: string;
  currentPrice: number;
  previousPrice: number;
  unit: string;
  priceChange: number;
  trend: 'up' | 'down' | 'stable';
  location: string;
  lastUpdated: string;
}

interface MarketInsight {
  crop: string;
  insight: string;
  recommendation: string;
}

interface CropPriceContextType {
  cropPrices: CropPrice[];
  popularCrops: CropPrice[];
  marketInsights: MarketInsight[];
  isLoading: boolean;
  error: string | null;
  refreshPrices: () => Promise<void>;
  searchCrops: (query: string) => CropPrice[];
}

const CropPriceContext = createContext<CropPriceContextType | undefined>(undefined);

export const useCropPrices = () => {
  const context = useContext(CropPriceContext);
  if (context === undefined) {
    throw new Error('useCropPrices must be used within a CropPriceProvider');
  }
  return context;
};

export const CropPriceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cropPrices, setCropPrices] = useState<CropPrice[]>([]);
  const [popularCrops, setPopularCrops] = useState<CropPrice[]>([]);
  const [marketInsights, setMarketInsights] = useState<MarketInsight[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCropPrices = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      const mockCropPrices: CropPrice[] = [
        {
          id: 'rice-001',
          name: 'Rice (Basmati)',
          currentPrice: 3800,
          previousPrice: 3600,
          unit: 'quintal',
          priceChange: 5.56,
          trend: 'up',
          location: 'Punjab',
          lastUpdated: new Date().toISOString()
        },
        {
          id: 'wheat-001',
          name: 'Wheat',
          currentPrice: 2200,
          previousPrice: 2250,
          unit: 'quintal',
          priceChange: -2.22,
          trend: 'down',
          location: 'Haryana',
          lastUpdated: new Date().toISOString()
        },
        {
          id: 'sugarcane-001',
          name: 'Sugarcane',
          currentPrice: 320,
          previousPrice: 315,
          unit: 'quintal',
          priceChange: 1.59,
          trend: 'up',
          location: 'Uttar Pradesh',
          lastUpdated: new Date().toISOString()
        },
        {
          id: 'cotton-001',
          name: 'Cotton',
          currentPrice: 6200,
          previousPrice: 5900,
          unit: 'quintal',
          priceChange: 5.08,
          trend: 'up',
          location: 'Gujarat',
          lastUpdated: new Date().toISOString()
        },
        {
          id: 'soybean-001',
          name: 'Soybean',
          currentPrice: 4200,
          previousPrice: 4150,
          unit: 'quintal',
          priceChange: 1.2,
          trend: 'up',
          location: 'Madhya Pradesh',
          lastUpdated: new Date().toISOString()
        },
        {
          id: 'turmeric-001',
          name: 'Turmeric',
          currentPrice: 7500,
          previousPrice: 7200,
          unit: 'quintal',
          priceChange: 4.17,
          trend: 'up',
          location: 'Tamil Nadu',
          lastUpdated: new Date().toISOString()
        },
        {
          id: 'potato-001',
          name: 'Potato',
          currentPrice: 1200,
          previousPrice: 1350,
          unit: 'quintal',
          priceChange: -11.11,
          trend: 'down',
          location: 'Uttar Pradesh',
          lastUpdated: new Date().toISOString()
        },
        {
          id: 'onion-001',
          name: 'Onion',
          currentPrice: 2800,
          previousPrice: 2500,
          unit: 'quintal',
          priceChange: 12,
          trend: 'up',
          location: 'Maharashtra',
          lastUpdated: new Date().toISOString()
        },
        {
          id: 'maize-001',
          name: 'Maize',
          currentPrice: 1850,
          previousPrice: 1800,
          unit: 'quintal',
          priceChange: 2.78,
          trend: 'up',
          location: 'Karnataka',
          lastUpdated: new Date().toISOString()
        },
        {
          id: 'groundnut-001',
          name: 'Groundnut',
          currentPrice: 5500,
          previousPrice: 5300,
          unit: 'quintal',
          priceChange: 3.77,
          trend: 'up',
          location: 'Gujarat',
          lastUpdated: new Date().toISOString()
        },
        {
          id: 'mustard-001',
          name: 'Mustard',
          currentPrice: 4800,
          previousPrice: 4600,
          unit: 'quintal',
          priceChange: 4.35,
          trend: 'up',
          location: 'Rajasthan',
          lastUpdated: new Date().toISOString()
        },
        {
          id: 'chilli-001',
          name: 'Red Chilli',
          currentPrice: 12000,
          previousPrice: 11500,
          unit: 'quintal',
          priceChange: 4.35,
          trend: 'up',
          location: 'Andhra Pradesh',
          lastUpdated: new Date().toISOString()
        },
        {
          id: 'jute-001',
          name: 'Jute',
          currentPrice: 4200,
          previousPrice: 4000,
          unit: 'quintal',
          priceChange: 5.00,
          trend: 'up',
          location: 'West Bengal',
          lastUpdated: new Date().toISOString()
        },
        {
          id: 'coffee-001',
          name: 'Coffee (Arabica)',
          currentPrice: 35000,
          previousPrice: 34000,
          unit: 'quintal',
          priceChange: 2.94,
          trend: 'up',
          location: 'Karnataka',
          lastUpdated: new Date().toISOString()
        },
        {
          id: 'barley-001',
          name: 'Barley',
          currentPrice: 1650,
          previousPrice: 1600,
          unit: 'quintal',
          priceChange: 3.13,
          trend: 'up',
          location: 'Rajasthan',
          lastUpdated: new Date().toISOString()
        },
        {
          id: 'gram-001',
          name: 'Gram (Chana)',
          currentPrice: 5200,
          previousPrice: 5000,
          unit: 'quintal',
          priceChange: 4.00,
          trend: 'up',
          location: 'Madhya Pradesh',
          lastUpdated: new Date().toISOString()
        },
        {
          id: 'arhar-001',
          name: 'Arhar (Tur)',
          currentPrice: 6800,
          previousPrice: 6500,
          unit: 'quintal',
          priceChange: 4.62,
          trend: 'up',
          location: 'Maharashtra',
          lastUpdated: new Date().toISOString()
        },
        {
          id: 'masoor-001',
          name: 'Masoor (Lentil)',
          currentPrice: 5500,
          previousPrice: 5300,
          unit: 'quintal',
          priceChange: 3.77,
          trend: 'up',
          location: 'Uttar Pradesh',
          lastUpdated: new Date().toISOString()
        },
        {
          id: 'moong-001',
          name: 'Moong (Green Gram)',
          currentPrice: 7200,
          previousPrice: 6900,
          unit: 'quintal',
          priceChange: 4.35,
          trend: 'up',
          location: 'Rajasthan',
          lastUpdated: new Date().toISOString()
        },
        {
          id: 'urad-001',
          name: 'Urad (Black Gram)',
          currentPrice: 6500,
          previousPrice: 6200,
          unit: 'quintal',
          priceChange: 4.84,
          trend: 'up',
          location: 'Andhra Pradesh',
          lastUpdated: new Date().toISOString()
        },
        {
          id: 'sesame-001',
          name: 'Sesame (Til)',
          currentPrice: 8500,
          previousPrice: 8200,
          unit: 'quintal',
          priceChange: 3.66,
          trend: 'up',
          location: 'Gujarat',
          lastUpdated: new Date().toISOString()
        },
        {
          id: 'sunflower-001',
          name: 'Sunflower',
          currentPrice: 6200,
          previousPrice: 5900,
          unit: 'quintal',
          priceChange: 5.08,
          trend: 'up',
          location: 'Karnataka',
          lastUpdated: new Date().toISOString()
        },
        {
          id: 'safflower-001',
          name: 'Safflower',
          currentPrice: 5800,
          previousPrice: 5600,
          unit: 'quintal',
          priceChange: 3.57,
          trend: 'up',
          location: 'Maharashtra',
          lastUpdated: new Date().toISOString()
        },
        {
          id: 'niger-001',
          name: 'Niger Seed',
          currentPrice: 7500,
          previousPrice: 7200,
          unit: 'quintal',
          priceChange: 4.17,
          trend: 'up',
          location: 'Odisha',
          lastUpdated: new Date().toISOString()
        },
        {
          id: 'coriander-001',
          name: 'Coriander',
          currentPrice: 9500,
          previousPrice: 9200,
          unit: 'quintal',
          priceChange: 3.26,
          trend: 'up',
          location: 'Rajasthan',
          lastUpdated: new Date().toISOString()
        },
        {
          id: 'fenugreek-001',
          name: 'Fenugreek (Methi)',
          currentPrice: 4800,
          previousPrice: 4600,
          unit: 'quintal',
          priceChange: 4.35,
          trend: 'up',
          location: 'Gujarat',
          lastUpdated: new Date().toISOString()
        },
        {
          id: 'fennel-001',
          name: 'Fennel (Saunf)',
          currentPrice: 15000,
          previousPrice: 14500,
          unit: 'quintal',
          priceChange: 3.45,
          trend: 'up',
          location: 'Gujarat',
          lastUpdated: new Date().toISOString()
        },
        {
          id: 'ajwain-001',
          name: 'Ajwain (Carom Seed)',
          currentPrice: 12000,
          previousPrice: 11500,
          unit: 'quintal',
          priceChange: 4.35,
          trend: 'up',
          location: 'Rajasthan',
          lastUpdated: new Date().toISOString()
        },
        {
          id: 'ginger-001',
          name: 'Ginger',
          currentPrice: 8500,
          previousPrice: 8000,
          unit: 'quintal',
          priceChange: 6.25,
          trend: 'up',
          location: 'Kerala',
          lastUpdated: new Date().toISOString()
        },
        {
          id: 'garlic-001',
          name: 'Garlic',
          currentPrice: 9200,
          previousPrice: 8800,
          unit: 'quintal',
          priceChange: 4.55,
          trend: 'up',
          location: 'Madhya Pradesh',
          lastUpdated: new Date().toISOString()
        },
        {
          id: 'cardamom-001',
          name: 'Cardamom',
          currentPrice: 95000,
          previousPrice: 92000,
          unit: 'quintal',
          priceChange: 3.26,
          trend: 'up',
          location: 'Kerala',
          lastUpdated: new Date().toISOString()
        },
        {
          id: 'black-pepper-001',
          name: 'Black Pepper',
          currentPrice: 48000,
          previousPrice: 46000,
          unit: 'quintal',
          priceChange: 4.35,
          trend: 'up',
          location: 'Kerala',
          lastUpdated: new Date().toISOString()
        },
        {
          id: 'cloves-001',
          name: 'Cloves',
          currentPrice: 85000,
          previousPrice: 82000,
          unit: 'quintal',
          priceChange: 3.66,
          trend: 'up',
          location: 'Tamil Nadu',
          lastUpdated: new Date().toISOString()
        },
        {
          id: 'nutmeg-001',
          name: 'Nutmeg',
          currentPrice: 120000,
          previousPrice: 115000,
          unit: 'quintal',
          priceChange: 4.35,
          trend: 'up',
          location: 'Kerala',
          lastUpdated: new Date().toISOString()
        },
        {
          id: 'tea-001',
          name: 'Tea',
          currentPrice: 25000,
          previousPrice: 24000,
          unit: 'quintal',
          priceChange: 4.17,
          trend: 'up',
          location: 'Assam',
          lastUpdated: new Date().toISOString()
        }
      ];
      
      const mockInsights: MarketInsight[] = [
        {
          crop: 'Rice',
          insight: 'Export demand driving prices up',
          recommendation: 'Consider holding stocks for 2-3 weeks'
        },
        {
          crop: 'Wheat',
          insight: 'Government procurement ongoing',
          recommendation: 'Monitor MSP purchases'
        },
        {
          crop: 'Cotton',
          insight: 'Global supply chain issues increasing demand',
          recommendation: 'Good time to sell quality produce'
        }
      ];
      
      setCropPrices(mockCropPrices);
      setPopularCrops(mockCropPrices.slice(0, 4));
      setMarketInsights(mockInsights);
    } catch (err) {
      console.error('Error fetching crop prices:', err);
      setError('Failed to fetch crop prices. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCropPrices();
  }, []);

  const refreshPrices = async () => {
    await fetchCropPrices();
  };

  const searchCrops = (query: string): CropPrice[] => {
    if (!query) return cropPrices;
    
    const lowerCaseQuery = query.toLowerCase();
    return cropPrices.filter(crop => 
      crop.name.toLowerCase().includes(lowerCaseQuery) || 
      crop.location.toLowerCase().includes(lowerCaseQuery)
    );
  };

  const value = {
    cropPrices,
    popularCrops,
    marketInsights,
    isLoading,
    error,
    refreshPrices,
    searchCrops
  };

  return <CropPriceContext.Provider value={value}>{children}</CropPriceContext.Provider>;
};