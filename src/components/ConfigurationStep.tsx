
import React from 'react';

interface ConfigurationStepProps {
  selectedConfig: string;
  onConfigSelect: (config: string) => void;
  onNext: () => void;
}

const ConfigurationStep: React.FC<ConfigurationStepProps> = ({
  selectedConfig,
  onConfigSelect,
  onNext
}) => {
  const configurations = ['1 BHK', '2 BHK', '3 BHK'];

  return (
    <div className="animate-slide-up">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="heading-primary text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-stone-800 mb-4">
          Choose your configuration
        </h2>
        <p className="text-elegant text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
          Tailor your space with your ideal configuration
        </p>
      </div>
      
      <div className="max-w-lg mx-auto space-y-4 sm:space-y-6 mb-12 sm:mb-16">
        {configurations.map((config, index) => (
          <div 
            key={config}
            className="animate-slide-in-left"
            style={{animationDelay: `${index * 0.1}s`}}
          >
            <button
              onClick={() => onConfigSelect(config)}
              className={`w-full py-5 sm:py-6 px-6 sm:px-8 border-2 text-lg sm:text-xl md:text-2xl font-medium transition-all duration-300 rounded-2xl elegant-hover group ${
                selectedConfig === config
                  ? 'border-amber-400 bg-gradient-to-r from-amber-50 to-amber-100 text-stone-800 shadow-lg'
                  : 'border-stone-200 bg-white/80 text-stone-700 hover:border-amber-300 hover:bg-amber-50/50 hover:shadow-md'
              }`}
            >
              <span className="heading-secondary">{config}</span>
              <div className={`w-full h-1 mt-3 rounded-full transition-all duration-300 ${
                selectedConfig === config 
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500' 
                  : 'bg-stone-200 group-hover:bg-amber-300'
              }`}></div>
            </button>
          </div>
        ))}
      </div>
      
      <div className="flex justify-end animate-scale-in" style={{animationDelay: '0.5s'}}>
        <button
          onClick={onNext}
          disabled={!selectedConfig}
          className={`px-8 sm:px-10 md:px-12 py-3 sm:py-4 font-medium transition-all duration-300 rounded-xl text-base sm:text-lg elegant-hover ${
            selectedConfig
              ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-stone-800 hover:from-amber-300 hover:to-amber-400 shadow-lg hover:shadow-xl'
              : 'bg-stone-300 text-stone-500 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default ConfigurationStep;
