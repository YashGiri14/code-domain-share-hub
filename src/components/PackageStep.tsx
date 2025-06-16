
import React from 'react';

interface Package {
  name: string;
  price: string;
  description: string;
  image: string;
}

interface PackageStepProps {
  selectedPackage: string;
  onPackageSelect: (packageName: string) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const PackageStep: React.FC<PackageStepProps> = ({
  selectedPackage,
  onPackageSelect,
  onNext,
  onPrevious
}) => {
  const packages: Package[] = [
    {
      name: 'Basic Blends',
      price: '₹',
      description: 'A variety of standard home interior solutions tailored to meet all your needs.',
      image: '/lovable-uploads/34d3ec1f-5d16-40e4-a4cd-b54eed4a3dab.png'
    },
    {
      name: 'Luxury Lux',
      price: '₹₹',
      description: 'A collection of luxury home interior solutions crafted to fulfill all your needs.',
      image: '/lovable-uploads/cec37b96-b2fa-466c-bce0-12e56097efb2.png'
    }
  ];

  return (
    <div className="animate-slide-up">
      <div className="text-center mb-6 md:mb-8">
        <h2 className="heading-primary text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-stone-800 mb-4">
          Select your package
        </h2>
        <p className="text-elegant text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
          Tailor your space with your ideal configuration
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 mb-8 sm:mb-12">
        {packages.map((pkg, index) => (
          <div
            key={pkg.name}
            onClick={() => onPackageSelect(pkg.name)}
            className={`animate-slide-in-left elegant-hover cursor-pointer transition-all duration-300 rounded-3xl overflow-hidden ${
              selectedPackage === pkg.name
                ? 'ring-4 ring-amber-400 shadow-2xl bg-gradient-to-br from-amber-50 to-white'
                : 'bg-white/90 hover:shadow-xl border border-stone-200'
            }`}
            style={{animationDelay: `${index * 0.2}s`}}
          >
            <div className="flex flex-col lg:flex-row items-center p-4 sm:p-6">
              <div className="relative w-full lg:w-1/2 mb-4 lg:mb-0 lg:mr-6">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-amber-400 to-amber-500 text-stone-800 px-3 py-1 rounded-full font-semibold shadow-lg text-sm">
                  {pkg.price}
                </div>
              </div>
              
              <div className="flex-1 text-center lg:text-left">
                <h3 className="heading-secondary text-xl sm:text-2xl md:text-3xl font-semibold text-stone-800 mb-3">
                  {pkg.name}
                </h3>
                <p className="text-elegant text-sm sm:text-base leading-relaxed max-w-lg">
                  {pkg.description}
                </p>
                
                <div className={`mt-4 inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedPackage === pkg.name
                    ? 'bg-amber-400 text-stone-800'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}>
                  {selectedPackage === pkg.name ? 'Selected' : 'Select Package'}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between space-x-4 animate-scale-in" style={{animationDelay: '0.6s'}}>
        <button
          onClick={onPrevious}
          className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 bg-gradient-to-r from-stone-800 to-stone-900 text-white font-medium hover:from-stone-700 hover:to-stone-800 transition-all duration-300 rounded-xl text-base sm:text-lg shadow-lg elegant-hover"
        >
          Previous
        </button>
        <button
          onClick={onNext}
          disabled={!selectedPackage}
          className={`px-6 sm:px-8 md:px-10 py-3 sm:py-4 font-medium transition-all duration-300 rounded-xl text-base sm:text-lg elegant-hover ${
            selectedPackage
              ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-stone-800 hover:from-amber-300 hover:to-amber-400 shadow-lg'
              : 'bg-stone-300 text-stone-500 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default PackageStep;
