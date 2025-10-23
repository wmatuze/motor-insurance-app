import React from 'react';
import { StepProps } from '../types';

const CoverageStep: React.FC<StepProps> = ({ formData, handleInputChange, errors }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Coverage Selection</h2>
      
      <div className="space-y-6">
        {/* Coverage Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select Coverage Type
          </label>
          <div className="space-y-3">
            {[
              { value: 'third-party', title: 'Third Party', desc: 'Basic coverage', price: 'ZMW 500/year' },
              { value: 'third-party-fire-theft', title: 'Third Party + Fire & Theft', desc: 'Enhanced protection', price: 'ZMW 800/year' },
              { value: 'comprehensive', title: 'Comprehensive', desc: 'Full coverage', price: 'ZMW 1500/year' }
            ].map((option) => (
              <label
                key={option.value}
                className={`block p-4 border-2 rounded-lg cursor-pointer ${
                  formData.coverageType === option.value ? 'border-blue-600 bg-blue-50' : 'border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  value={option.value}
                  checked={formData.coverageType === option.value}
                  onChange={(e) => handleInputChange('coverageType', e.target.value)}
                  className="mr-3"
                />
                <span className="font-semibold">{option.title}</span>
                <p className="text-sm text-gray-600 ml-6">{option.desc} - {option.price}</p>
              </label>
            ))}
          </div>
          {errors.coverageType && <p className="mt-2 text-sm text-red-600">{errors.coverageType}</p>}
        </div>

        {/* Vehicle Usage */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Vehicle Usage
          </label>
          <div className="space-y-3">
            {[
              { value: 'personal', label: 'Personal Use' },
              { value: 'commercial', label: 'Commercial Use' }
            ].map((option) => (
              <label
                key={option.value}
                className={`block p-4 border-2 rounded-lg cursor-pointer ${
                  formData.vehicleUsage === option.value ? 'border-blue-600 bg-blue-50' : 'border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  value={option.value}
                  checked={formData.vehicleUsage === option.value}
                  onChange={(e) => handleInputChange('vehicleUsage', e.target.value)}
                  className="mr-3"
                />
                <span className="font-medium">{option.label}</span>
              </label>
            ))}
          </div>
          {errors.vehicleUsage && <p className="mt-2 text-sm text-red-600">{errors.vehicleUsage}</p>}
        </div>
      </div>
    </div>
  );
};

export default CoverageStep;