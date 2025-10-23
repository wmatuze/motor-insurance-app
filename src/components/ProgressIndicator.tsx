import React from 'react';
import { Check, User, Car, ShieldCheck, FileText } from 'lucide-react';
import { ProgressIndicatorProps } from '../types';

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentStep }) => {
  const steps = [
    { number: 1, name: 'Personal', fullName: 'Personal Details', icon: User },
    { number: 2, name: 'Vehicle', fullName: 'Vehicle Details', icon: Car },
    { number: 3, name: 'Coverage', fullName: 'Coverage Type', icon: ShieldCheck },
    { number: 4, name: 'Quote', fullName: 'Quote Summary', icon: FileText }
  ];

  return (
    <div className="relative py-6">
      {/* Desktop Progress Bar */}
      <div className="hidden md:block">
        <div className="flex justify-between items-start">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = currentStep > step.number;
            const isCurrent = currentStep === step.number;
            
            return (
              <div key={step.number} className="flex items-start flex-1 relative">
                <div className="flex flex-col items-center flex-1 relative z-10">
                  {/* Circle with Icon */}
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center font-bold transition-all duration-500 transform ${
                      isCompleted
                        ? 'bg-success-500 text-white shadow-lg shadow-success-200 scale-110'
                        : isCurrent
                        ? 'bg-primary-600 text-white shadow-xl shadow-primary-200 scale-125 ring-4 ring-primary-100'
                        : 'bg-gray-100 text-gray-400 shadow-sm'
                    }`}
                  >
                    {isCompleted ? (
                      <Check size={28} strokeWidth={3} />
                    ) : (
                      <Icon size={28} strokeWidth={isCurrent ? 2.5 : 2} />
                    )}
                  </div>
                  
                  {/* Label */}
                  <div className="mt-4 text-center">
                    <p className={`text-sm font-semibold ${
                      isCurrent ? 'text-primary-700' : isCompleted ? 'text-success-700' : 'text-gray-500'
                    }`}>
                      {step.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 hidden lg:block">
                      {step.fullName}
                    </p>
                  </div>

                  {/* Animated Badge for Current Step */}
                  {isCurrent && (
                    <div className="absolute -top-2 -right-2">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-600"></span>
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <div className="absolute top-8 left-1/2 w-full h-1 -z-10">
                    <div className="h-full w-full bg-gray-200 rounded">
                      <div
                        className={`h-full rounded transition-all duration-500 ${
                          currentStep > step.number 
                            ? 'bg-success-500 w-full' 
                            : 'bg-gray-200 w-0'
                        }`}
                        style={{
                          width: currentStep > step.number ? '100%' : '0%'
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Progress Bar */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-500">Step {currentStep} of {steps.length}</p>
            <p className="text-lg font-bold text-gray-900">{steps[currentStep - 1].fullName}</p>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-primary-600 text-white flex items-center justify-center shadow-xl shadow-primary-200">
            {React.createElement(steps[currentStep - 1].icon, { size: 28 })}
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;