import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      fullWidth = false,
      leftIcon,
      rightIcon,
      containerClassName = '',
      className = '',
      ...props
    },
    ref
  ) => {
    const hasError = !!error;
    
    const baseInputClasses = 'block rounded-md focus:outline-none transition-colors duration-200';
    const stateClasses = hasError
      ? 'border-error-500 focus:border-error-500 focus:ring-error-500 text-error-900 placeholder-error-300'
      : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500';
    
    const sizeClasses = 'px-4 py-2 text-base';
    const iconClasses = leftIcon ? 'pl-10' : '';
    const widthClasses = fullWidth ? 'w-full' : '';
    
    return (
      <div className={`${fullWidth ? 'w-full' : ''} ${containerClassName}`}>
        {label && (
          <label 
            htmlFor={props.id} 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            className={`
              ${baseInputClasses}
              ${stateClasses}
              ${sizeClasses}
              ${iconClasses}
              ${widthClasses}
              ${className}
            `}
            aria-invalid={hasError}
            aria-describedby={
              props.id ? `${props.id}-helper-text ${props.id}-error` : undefined
            }
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
              {rightIcon}
            </div>
          )}
        </div>
        
        {helperText && !error && (
          <p
            id={props.id ? `${props.id}-helper-text` : undefined}
            className="mt-1 text-sm text-gray-500"
          >
            {helperText}
          </p>
        )}
        
        {error && (
          <p
            id={props.id ? `${props.id}-error` : undefined}
            className="mt-1 text-sm text-error-500"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;