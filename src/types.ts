/**
 * Type definitions for the Motor Insurance Quote application
 */

// Stores all form data across the 4 steps
export interface FormData {
    fullName: string;
    email: string;
    phone: string;
    idNumber: string;
    vehicleMake: string;
    vehicleModel: string;
    yearOfManufacture: string;
    registrationNumber: string;
    vehicleValue: string;
    coverageType: string;
    vehicleUsage: string;
  }

  // Stores validation error messages for form fields
  export interface ValidationErrors {
    [key: string]: string;
  }

  // Props passed to each step component
  export interface StepProps {
    formData: FormData;
    handleInputChange: (field: keyof FormData, value: string) => void;
    errors: ValidationErrors;
  }

  // Props for InputField component
  export interface InputFieldProps {
    label: string;
    type: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    icon?: React.ReactNode;
    error?: string;
    required?: boolean;
  }

  // Props for ProgressIndicator component
  export interface ProgressIndicatorProps {
    currentStep: number;
  }

  // Props for QuoteSummary component
  export interface QuoteSummaryProps {
    formData: FormData;
    quote: string;
  }