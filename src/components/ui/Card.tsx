import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  onClick?: () => void;
  elevation?: 'low' | 'medium' | 'high';
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  interactive = false,
  onClick,
  elevation = 'medium'
}) => {
  const baseClasses = 'bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden border border-white/20';
  
  const elevationClasses = {
    low: 'shadow-sm',
    medium: 'shadow-farming',
    high: 'shadow-xl'
  };
  
  const interactiveClasses = interactive 
    ? 'transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer'
    : '';
  
  return (
    <motion.div
      className={`${baseClasses} ${elevationClasses[elevation]} ${interactiveClasses} ${className}`}
      onClick={onClick}
      whileHover={interactive ? { y: -8, scale: 1.02 } : {}}
      whileTap={interactive ? { y: -4, scale: 0.98 } : {}}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default Card;