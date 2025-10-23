import React from 'react';
import InputField from './InputField';
import { StepProps } from '../types';

const VehicleDetailsStep: React.FC<StepProps> = ({ formData, handleInputChange, errors }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Vehicle Details</h2>
      
      <div className="space-y-4">
        <InputField
          label="Vehicle Make"
          type="text"
          value={formData.vehicleMake}
          onChange={(value) => handleInputChange('vehicleMake', value)}
          placeholder="Toyota, Honda, etc."
          error={errors.vehicleMake}
        />

        <InputField
          label="Vehicle Model"
          type="text"
          value={formData.vehicleModel}
          onChange={(value) => handleInputChange('vehicleModel', value)}
          placeholder="Corolla, Civic, etc."
          error={errors.vehicleModel}
        />

        <InputField
          label="Year of Manufacture"
          type="number"
          value={formData.yearOfManufacture}
          onChange={(value) => handleInputChange('yearOfManufacture', value)}
          placeholder="2020"
          error={errors.yearOfManufacture}
        />

        <InputField
          label="Registration Number"
          type="text"
          value={formData.registrationNumber}
          onChange={(value) => handleInputChange('registrationNumber', value)}
          placeholder="ABC 1234"
          error={errors.registrationNumber}
        />

        <InputField
          label="Vehicle Value (ZMW)"
          type="number"
          value={formData.vehicleValue}
          onChange={(value) => handleInputChange('vehicleValue', value)}
          placeholder="50000"
          error={errors.vehicleValue}
        />
      </div>
    </div>
  );
};

export default VehicleDetailsStep;