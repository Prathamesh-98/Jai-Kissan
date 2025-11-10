import React, { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { validatePassword, PasswordValidation } from '../../utils/validation';

interface PasswordInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  fullWidth?: boolean;
  showStrengthIndicator?: boolean;
  containerClassName?: string;
  required?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  id,
  label,
  value,
  onChange,
  error,
  fullWidth = false,
  showStrengthIndicator = false,
  containerClassName = '',
  required = false
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [validation, setValidation] = useState<PasswordValidation | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    if (showStrengthIndicator) {
      setValidation(validatePassword(e.target.value));
    }
  };

  const getStrengthColor = (strength: 'weak' | 'medium' | 'strong') => {
    switch (strength) {
      case 'weak':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'strong':
        return 'bg-green-500';
      default:
        return 'bg-gray-300';
    }
  };

  const getStrengthWidth = (strength: 'weak' | 'medium' | 'strong') => {
    switch (strength) {
      case 'weak':
        return 'w-1/3';
      case 'medium':
        return 'w-2/3';
      case 'strong':
        return 'w-full';
      default:
        return 'w-0';
    }
  };

  return (
    <div className={`${fullWidth ? 'w-full' : ''} ${containerClassName}`}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
          <Lock size={18} />
        </div>
        
        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={handleChange}
          required={required}
          className={`
            block rounded-md focus:outline-none transition-colors duration-200 pl-10 pr-10 py-2 text-base w-full
            ${error 
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500 text-red-900 placeholder-red-300'
              : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
            }
          `}
          placeholder="Enter your password"
        />
        
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {showStrengthIndicator && value && validation && (
        <div className="mt-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">Password strength:</span>
            <span className={`text-xs font-medium ${
              validation.strength === 'strong' ? 'text-green-600' :
              validation.strength === 'medium' ? 'text-yellow-600' :
              'text-red-600'
            }`}>
              {validation.strength.charAt(0).toUpperCase() + validation.strength.slice(1)}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(validation.strength)} ${getStrengthWidth(validation.strength)}`}
            ></div>
          </div>
        </div>
      )}

      {validation && validation.errors.length > 0 && (
        <div className="mt-2">
          <ul className="text-xs text-red-600 space-y-1">
            {validation.errors.map((error, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-1">•</span>
                <span>{error}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default PasswordInput;