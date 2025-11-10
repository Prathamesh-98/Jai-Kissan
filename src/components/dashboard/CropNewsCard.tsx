import React from 'react';
import { motion } from 'framer-motion';
import { Newspaper, TrendingUp, TrendingDown, ExternalLink } from 'lucide-react';
import Card from '../ui/Card';
import { format } from 'date-fns';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  sourceUrl: string;
  date: string;
  impact: 'positive' | 'negative' | 'neutral';
  relatedCrops: string[];
}

const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'Wheat Prices Surge Due to Global Supply Concerns',
    summary: 'International wheat prices have risen by 5% following supply chain disruptions in major exporting countries.',
    source: 'Agri Market News',
    sourceUrl: '#',
    date: new Date().toISOString(),
    impact: 'positive',
    relatedCrops: ['Wheat']
  },
  {
    id: '2',
    title: 'Government Increases MSP for Kharif Crops',
    summary: 'Cabinet approves higher minimum support prices for paddy, pulses, and oilseeds to boost farmer income.',
    source: 'Ministry of Agriculture',
    sourceUrl: '#',
    date: new Date().toISOString(),
    impact: 'positive',
    relatedCrops: ['Rice', 'Soybean', 'Groundnut']
  },
  {
    id: '3',
    title: 'Cotton Exports Expected to Decline',
    summary: 'Cotton exports may decrease due to reduced international demand and competitive pricing from other countries.',
    source: 'Cotton Association of India',
    sourceUrl: '#',
    date: new Date().toISOString(),
    impact: 'negative',
    relatedCrops: ['Cotton']
  },
  {
    id: '4',
    title: 'Record Sugar Production Expected This Season',
    summary: 'Sugar output forecast revised upward following favorable weather conditions in major growing regions.',
    source: 'Sugar Industry Report',
    sourceUrl: '#',
    date: new Date().toISOString(),
    impact: 'neutral',
    relatedCrops: ['Sugarcane']
  }
];

const CropNewsCard: React.FC = () => {
  return (
    <Card className="overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Newspaper className="h-5 w-5 text-primary-600" />
            Daily Market Updates
          </h3>
          <span className="text-sm text-gray-500">
            {format(new Date(), 'MMMM d, yyyy')}
          </span>
        </div>

        <div className="space-y-6">
          {mockNews.map((news, index) => (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border-b border-gray-100 last:border-0 pb-4 last:pb-0"
            >
              <div className="flex items-start gap-3">
                <div className={`mt-1 p-2 rounded-full ${
                  news.impact === 'positive' ? 'bg-success-100' :
                  news.impact === 'negative' ? 'bg-error-100' :
                  'bg-gray-100'
                }`}>
                  {news.impact === 'positive' ? (
                    <TrendingUp className="h-4 w-4 text-success-600" />
                  ) : news.impact === 'negative' ? (
                    <TrendingDown className="h-4 w-4 text-error-600" />
                  ) : (
                    <ExternalLink className="h-4 w-4 text-gray-600" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="text-base font-medium text-gray-900 mb-1">
                    {news.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    {news.summary}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {news.relatedCrops.map(crop => (
                        <span
                          key={crop}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-800"
                        >
                          {crop}
                        </span>
                      ))}
                    </div>
                    <a
                      href={news.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary-600 hover:text-primary-700 flex items-center gap-1"
                    >
                      {news.source}
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default CropNewsCard;