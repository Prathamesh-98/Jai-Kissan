import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, ArrowRight, Search, RefreshCw } from 'lucide-react';
import Card from '../ui/Card';
import { useCropPrices } from '../../contexts/CropPriceContext';
import Button from '../ui/Button';

interface CropPriceCardProps {
  compact?: boolean;
}

const CropPriceCard: React.FC<CropPriceCardProps> = ({ compact = false }) => {
  const { popularCrops, cropPrices, isLoading, error, refreshPrices } = useCropPrices();
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshPrices();
    setIsRefreshing(false);
  };
  
  const filteredCrops = searchQuery
    ? cropPrices.filter(crop => 
        crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        crop.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : compact ? popularCrops : cropPrices;
  
  if (isLoading) {
    return (
      <Card className="p-6 h-64 flex items-center justify-center">
        <div className="animate-pulse w-full">
          <div className="h-4 w-1/3 bg-gray-200 rounded mb-6"></div>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center justify-between mb-4">
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
              <div className="h-4 w-16 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </Card>
    );
  }
  
  if (error) {
    return (
      <Card className="p-6 text-center">
        <p className="text-error-500 mb-2">Error loading crop prices</p>
        <p className="text-sm text-gray-500">{error}</p>
      </Card>
    );
  }
  
  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp size={16} className="text-success-500" />;
      case 'down':
        return <TrendingDown size={16} className="text-error-500" />;
      case 'stable':
        return <Minus size={16} className="text-gray-400" />;
      default:
        return null;
    }
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };
  
  return (
    <Card className="overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            {compact ? 'Popular Crop Prices' : 'Current Market Prices'}
          </h3>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              className="flex items-center gap-1"
              isLoading={isRefreshing}
            >
              <RefreshCw size={14} />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
            {compact && (
              <Button
                variant="primary"
                size="sm"
                className="flex items-center gap-1"
              >
                <span>View all</span>
                <ArrowRight size={14} />
              </Button>
            )}
          </div>
        </div>
        
        {!compact && (
          <div className="mb-4">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search crops or locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        )}
        
        <div className="overflow-hidden">
          <table className="min-w-full">
            <thead>
              <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <th className="pb-3">Crop</th>
                <th className="pb-3 text-right">Price/{compact ? '' : 'Unit'}</th>
                {!compact && <th className="pb-3 text-right">Change</th>}
                <th className="pb-3 text-right">Trend</th>
              </tr>
            </thead>
            <tbody>
              {filteredCrops.map((crop, index) => (
                <motion.tr 
                  key={crop.id}
                  className="text-sm border-t border-gray-100"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <td className="py-3">
                    <div className="font-medium text-gray-800">{crop.name}</div>
                    {!compact && (
                      <div className="text-xs text-gray-500">{crop.location}</div>
                    )}
                  </td>
                  <td className="py-3 text-right">
                    <div className="font-medium text-gray-800">{formatPrice(crop.currentPrice)}</div>
                    {!compact ? (
                      <div className="text-xs text-gray-500">per {crop.unit}</div>
                    ) : (
                      <div className="text-xs text-gray-500">{crop.unit}</div>
                    )}
                  </td>
                  {!compact && (
                    <td className="py-3 text-right">
                      <div className={`font-medium ${
                        crop.trend === 'up' ? 'text-success-500' : 
                        crop.trend === 'down' ? 'text-error-500' : 'text-gray-500'
                      }`}>
                        {crop.priceChange > 0 ? '+' : ''}{crop.priceChange}%
                      </div>
                    </td>
                  )}
                  <td className="py-3 text-right">
                    <div className="flex justify-end">
                      {getTrendIcon(crop.trend)}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
};

export default CropPriceCard;