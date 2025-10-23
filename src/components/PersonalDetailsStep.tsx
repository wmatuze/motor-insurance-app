import React from 'react';
import InputField from './InputField';
import { StepProps } from '../types';

const PersonalDetailsStep: React.FC<StepProps> = ({ formData, handleInputChange, errors }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Personal Details</h2>
      
      <div className="space-y-4">
        <InputField
          label="Full Name"
          type="text"
          value={formData.fullName}
          onChange={(value) => handleInputChange('fullName', value)}
          placeholder="Watu Matuze"
          error={errors.fullName}
        />

        <InputField
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={(value) => handleInputChange('email', value)}
          placeholder="watu.matuze@example.com"
          error={errors.email}
        />

        <InputField
          label="Phone Number"
          type="tel"
          value={formData.phone}
          onChange={(value) => handleInputChange('phone', value)}
          placeholder="+260 XXX XXX XXX"
          error={errors.phone}
        />

        <InputField
          label="ID / License Number"
          type="text"
          value={formData.idNumber}
          onChange={(value) => handleInputChange('idNumber', value)}
          placeholder="123456/78/9"
          error={errors.idNumber}
        />
      </div>
    </div>
  );
};

export default PersonalDetailsStep;