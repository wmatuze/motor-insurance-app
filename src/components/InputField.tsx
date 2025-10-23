import React, { useState } from 'react';
import { InputFieldProps } from '../types';
import { Check } from 'lucide-react';

const InputField: React.FC<InputFieldProps> = ({ 
  label, 
  type, 
  value, 
  onChange, 
  placeholder, 
  icon, 
  error,
  required = false 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && value.length > 0;
  const isValid = hasValue && !error;

  return (
    <div className="group">
      <label className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-primary-600">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {/* Icon */}
        {icon && (
          <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors ${
            isFocused ? 'text-primary-600' : error ? 'text-red-500' : 'text-gray-400'
          }`}>
            {icon}
          </div>
        )}

        {/* Input Field */}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          aria-label={label}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${label}-error` : undefined}
          className={`w-full ${icon ? 'pl-12' : 'pl-4'} ${isValid ? 'pr-12' : 'pr-4'} py-4 border-2 rounded-xl font-medium
            focus:ring-4 focus:border-transparent outline-none 
            transition-all duration-200 ${
            error 
              ? 'border-red-300 bg-red-50 focus:ring-red-100 focus:border-red-500' 
              : isFocused
              ? 'border-primary-500 bg-white focus:ring-primary-100'
              : isValid
              ? 'border-success-300 bg-success-50'
              : 'border-gray-200 bg-gray-50 hover:border-gray-300'
          }`}
        />

        {/* Success Check Mark */}
        {isValid && (
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <div className="w-6 h-6 bg-success-500 rounded-full flex items-center justify-center animate-scale-in">
              <Check size={14} className="text-white" strokeWidth={3} />
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-2 flex items-start gap-2 animate-slide-in">
          <div className="w-1 h-1 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
          <p id={`${label}-error`} className="text-sm text-red-600 font-medium" role="alert">
            {error}
          </p>
        </div>
      )}

      {/* Helper Text - Shows when focused */}
      {isFocused && !error && (
        <p className="mt-2 text-xs text-gray-500 animate-fade-in">
          {type === 'email' && 'We\'ll never share your email'}
          {type === 'tel' && 'Enter your number with country code'}
        </p>
      )}
    </div>
  );
};

export default InputField;