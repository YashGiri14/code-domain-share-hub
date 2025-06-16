
import React from 'react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex justify-center items-center mb-8 space-x-4">
      {Array.from({ length: totalSteps }, (_, index) => (
        <div key={index} className="flex items-center">
          <div
            className={`relative w-4 h-4 rounded-full transition-all duration-500 elegant-hover ${
              index < currentStep 
                ? 'bg-gradient-to-r from-amber-400 to-amber-500 shadow-lg scale-110' 
                : index === currentStep 
                ? 'bg-gradient-to-r from-amber-400 to-amber-500 shadow-xl scale-125 ring-4 ring-amber-200' 
                : 'bg-stone-300 hover:bg-stone-400'
            }`}
          >
            {index < currentStep && (
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-2.5 h-2.5 text-stone-800" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
            {index === currentStep && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 bg-stone-800 rounded-full animate-pulse"></div>
              </div>
            )}
          </div>
          {index < totalSteps - 1 && (
            <div 
              className={`w-8 h-0.5 mx-2 transition-all duration-500 ${
                index < currentStep 
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500' 
                  : 'bg-stone-300'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressIndicator;
