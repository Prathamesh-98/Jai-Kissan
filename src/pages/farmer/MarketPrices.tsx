import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Search, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { useLocation } from '../../contexts/LocationContext';
import { useCropPrices } from '../../contexts/CropPriceContext';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const MarketPrices: React.FC = () => {
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  const { currentLocation } = useLocation();
  const { cropPrices, isLoading, error, refreshPrices } = useCropPrices();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isRefreshing, setIsRefreshing] = React.useState(false);

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
    : cropPrices;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar variant="dashboard" />
        <main className="pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-20 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar variant="dashboard" />
      
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="py-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-semibold text-gray-900">{t('marketPrices.title')}</h1>
            <div className="mt-1 flex items-center text-sm text-gray-500">
              <MapPin size={16} className="mr-1" />
              {currentLocation ? (
                `${currentLocation.district}, ${currentLocation.state}`
              ) : (
                t('marketPrices.location')
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="relative flex-1 max-w-lg">
                    <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder={t('marketPrices.searchPlaceholder')}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRefresh}
                    className="ml-4 flex items-center gap-2"
                    isLoading={isRefreshing}
                  >
                    <RefreshCw size={16} />
                    <span className="hidden sm:inline">Refresh</span>
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <th className="px-6 py-3">Crop</th>
                        <th className="px-6 py-3">{t('marketPrices.price')}</th>
                        <th className="px-6 py-3">{t('marketPrices.change')}</th>
                        <th className="px-6 py-3">{t('marketPrices.location')}</th>
                        <th className="px-6 py-3">{t('marketPrices.lastUpdated')}</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredCrops.map((crop, index) => (
                        <motion.tr
                          key={crop.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="hover:bg-gray-50"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{crop.name}</div>
                            <div className="text-xs text-gray-500">{crop.unit}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {formatPrice(crop.currentPrice)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`text-sm font-medium ${
                              crop.priceChange > 0 ? 'text-success-500' :
                              crop.priceChange < 0 ? 'text-error-500' :
                              'text-gray-500'
                            }`}>
                              {crop.priceChange > 0 ? '+' : ''}{crop.priceChange}%
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{crop.location}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(crop.lastUpdated).toLocaleDateString()}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredCrops.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No matching crops found</p>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MarketPrices;