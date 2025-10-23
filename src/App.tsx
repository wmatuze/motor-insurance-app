import { useState } from 'react';
import Header from './components/Header';
import ProgressIndicator from './components/ProgressIndicator';
import PersonalDetailsStep from './components/PersonalDetailsStep';
import VehicleDetailsStep from './components/VehicleDetailsStep';
import CoverageStep from './components/CoverageStep';
import QuoteSummary from './components/QuoteSummary';
import { calculateQuote, validateStep } from './utils';
import { Save, RotateCcw, ChevronRight } from 'lucide-react';
import { FormData, ValidationErrors } from './types';

/**
 * Main App Component
 * Manages a 4-step motor insurance quotation form
 */
function App() {
  // Track which step the user is on (1-4)
  const [currentStep, setCurrentStep] = useState(1);

  // Store validation errors for form fields
  const [errors, setErrors] = useState<ValidationErrors>({});

  // Store all form data across all steps
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    idNumber: '',
    vehicleMake: '',
    vehicleModel: '',
    yearOfManufacture: '',
    registrationNumber: '',
    vehicleValue: '',
    coverageType: '',
    vehicleUsage: ''
  });

  // State for save notification
  const [showSaveNotification, setShowSaveNotification] = useState(false);

  // Update form data and clear error for that field
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  // Move to next step after validating current step
  const nextStep = () => {
    const stepErrors = validateStep(currentStep, formData);

    // If validation fails, show errors and don't proceed
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    // Move to next step and clear any previous errors
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      setErrors({});
    }
  };

  // Go back to previous step
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  // Save progress to localStorage
  const saveProgress = () => {
    localStorage.setItem('insuranceFormData', JSON.stringify(formData));
    localStorage.setItem('insuranceFormStep', currentStep.toString());
    setShowSaveNotification(true);
    setTimeout(() => setShowSaveNotification(false), 3000);
  };

  // Reset form
  const resetForm = () => {
    if (window.confirm('Are you sure you want to reset the form? All data will be lost.')) {
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        idNumber: '',
        vehicleMake: '',
        vehicleModel: '',
        yearOfManufacture: '',
        registrationNumber: '',
        vehicleValue: '',
        coverageType: '',
        vehicleUsage: ''
      });
      setCurrentStep(1);
      setErrors({});
      localStorage.removeItem('insuranceFormData');
      localStorage.removeItem('insuranceFormStep');
    }
  };

  // Calculate the insurance quote based on form data
  const quoteAmount = calculateQuote(formData);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <Header />

      {/* Hero Section - Only show on step 1 */}
      {currentStep === 1 && (
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 font-display">
              Get Your Insurance Quote in Minutes
            </h2>
            <p className="text-xl text-primary-100 mb-6">
              Fast | Reliable | Affordable Coverage
            </p>
            <div className="flex justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success-400 rounded-full"></div>
                <span>No hidden fees</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success-400 rounded-full"></div>
                <span>Instant quotes</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success-400 rounded-full"></div>
                <span>24/7 support</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-12">
        
        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mb-6">
          <button
            onClick={saveProgress}
            className="flex items-center gap-2 px-4 py-2.5 bg-white text-gray-700 rounded-xl shadow-soft hover:shadow-medium transition-all text-sm font-semibold border border-gray-100"
          >
            <Save size={16} />
            <span className="hidden sm:inline">Save Progress</span>
          </button>
          <button
            onClick={resetForm}
            className="flex items-center gap-2 px-4 py-2.5 bg-white text-red-600 rounded-xl shadow-soft hover:shadow-medium transition-all text-sm font-semibold border border-red-100"
          >
            <RotateCcw size={16} />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>

        {/* Save Notification - Enhanced */}
        {showSaveNotification && (
          <div className="mb-6 p-4 bg-gradient-to-r from-success-50 to-success-100 text-success-800 rounded-xl shadow-medium border border-success-200 animate-slide-in flex items-center gap-3">
            <div className="w-8 h-8 bg-success-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="font-semibold">Progress saved successfully!</p>
              <p className="text-xs text-success-700">You can continue later from where you left off</p>
            </div>
          </div>
        )}

        {/* Progress Indicator */}
        <ProgressIndicator currentStep={currentStep} />

        {/* Main Card - Enhanced Shadow & Border */}
        <div className="bg-white rounded-3xl shadow-strong border border-gray-100 p-8 sm:p-12 mt-8 animate-fade-in">
          
          {/* Steps */}
          {currentStep === 1 && (
            <PersonalDetailsStep 
              formData={formData}
              handleInputChange={handleInputChange}
              errors={errors}
            />
          )}

          {currentStep === 2 && (
            <VehicleDetailsStep 
              formData={formData}
              handleInputChange={handleInputChange}
              errors={errors}
            />
          )}

          {currentStep === 3 && (
            <CoverageStep 
              formData={formData}
              handleInputChange={handleInputChange}
              errors={errors}
            />
          )}

          {currentStep === 4 && (
            <QuoteSummary 
              formData={formData}
              quote={quoteAmount}
            />
          )}

          {/* Navigation - Enhanced Buttons */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t-2 border-gray-100">
            {currentStep > 1 ? (
              <button
                onClick={prevStep}
                className="flex items-center gap-2 px-8 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all shadow-sm hover:shadow-md transform hover:scale-105"
              >
                ← Previous
              </button>
            ) : <div></div>}
            
            {currentStep < 4 && (
              <button
                onClick={nextStep}
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg shadow-primary-200 hover:shadow-xl hover:shadow-primary-300 transform hover:scale-105"
              >
                Continue
                <ChevronRight size={20} />
              </button>
            )}

            {currentStep === 4 && (
              <button
                onClick={() => {
                  alert('Quote request submitted successfully! Our team will contact you shortly.');
                }}
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-success-600 to-success-700 text-white rounded-xl font-semibold hover:from-success-700 hover:to-success-800 transition-all shadow-lg shadow-success-200 hover:shadow-xl hover:shadow-success-300 transform hover:scale-105"
              >
                Submit Quote Request
                <ChevronRight size={20} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm">© 2025 InsureQuick. All rights reserved. Powered by Hobbiton Technologies.</p>
          <p className="text-xs text-gray-500 mt-2">Licensed by the Pensions and Insurance Authority (PIA) </p>
        </div>
      </footer>
    </div>
  );
}

export default App;