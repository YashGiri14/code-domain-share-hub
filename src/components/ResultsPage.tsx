
import React from 'react';

interface ResultsPageProps {
  configuration: string;
  rooms: Array<{ name: string; count: number }>;
  packageType: string;
  contactInfo: any;
}

const ResultsPage: React.FC<ResultsPageProps> = ({
  configuration,
  rooms,
  packageType,
  contactInfo
}) => {
  const totalRooms = rooms.reduce((sum, room) => sum + room.count, 0);
  const basePrice = 48000;
  const estimate = (basePrice * totalRooms * (packageType === 'Luxury Lux' ? 2.5 : 1)).toFixed(0);

  const roomsList = rooms
    .filter(room => room.count > 0)
    .map(room => `${room.count} ${room.name}${room.count > 1 ? 's' : ''}`)
    .join(', ');

  // Get the appropriate image based on package type
  const getPackageImage = () => {
    if (packageType === 'Luxury Lux') {
      return '/lovable-uploads/cec37b96-b2fa-466c-bce0-12e56097efb2.png';
    } else {
      return '/lovable-uploads/34d3ec1f-5d16-40e4-a4cd-b54eed4a3dab.png';
    }
  };

  const handleBackToStart = () => {
    window.location.reload(); // This will refresh the page and go back to the first step
  };

  return (
    <div className="min-h-screen bg-stone-50 relative overflow-hidden">
      {/* Interior-based background images */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
          style={{
            backgroundImage: `url('/lovable-uploads/34d3ec1f-5d16-40e4-a4cd-b54eed4a3dab.png')`
          }}
        ></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{
            backgroundImage: `url('/lovable-uploads/cec37b96-b2fa-466c-bce0-12e56097efb2.png')`,
            backgroundBlendMode: 'overlay'
          }}
        ></div>
      </div>
      
      {/* Subtle overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-50/90 via-stone-100/85 to-amber-50/90"></div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-stone-200/30 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-amber-100/30 rounded-full blur-xl animate-gentle-bounce"></div>
      
      <div className="relative z-10 py-6 sm:py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="glass-card rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 animate-slide-up">
            <div className="text-center mb-6 md:mb-8">
              <div className="inline-block mb-4 animate-gentle-bounce">
                <img
                  src="/lovable-uploads/0e7764bc-df65-4205-841f-740f7b35349b.png"
                  alt="Artisan Studio"
                  className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto mx-auto drop-shadow-xl"
                />
              </div>
              
              <h2 className="heading-primary text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-stone-800 mb-4">
                Your estimate is ready now
              </h2>
              <p className="text-elegant text-base sm:text-lg md:text-xl max-w-3xl mx-auto">
                We ensure that your new home is going to be amazing.
              </p>
            </div>

            <div className="flex flex-col xl:flex-row gap-6 md:gap-8">
              <div className="xl:w-1/2 animate-slide-in-left" style={{animationDelay: '0.3s'}}>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src={getPackageImage()}
                    alt={`${packageType} Interior Design`}
                    className="w-full h-48 sm:h-64 md:h-80 xl:h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>
              
              <div className="xl:w-1/2 animate-slide-up" style={{animationDelay: '0.5s'}}>
                <div className="bg-gradient-to-br from-white/95 to-stone-50/95 p-4 sm:p-6 md:p-8 rounded-3xl shadow-lg border border-stone-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="heading-secondary text-lg sm:text-xl md:text-2xl text-stone-800">{packageType}</h3>
                    <div className="text-right">
                      <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-600">₹ {estimate} L*</span>
                      <p className="text-xs text-stone-600">Estimated Price</p>
                    </div>
                  </div>
                  
                  <p className="text-elegant text-sm sm:text-base mb-6">
                    A variety of standard home interior solutions tailored to meet all your needs.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="bg-white/80 p-3 rounded-2xl">
                      <span className="font-semibold text-stone-800 text-sm sm:text-base">Configuration:</span>
                      <span className="ml-2 text-stone-600 text-sm sm:text-base">{configuration}</span>
                    </div>
                    
                    <div className="bg-white/80 p-3 rounded-2xl">
                      <span className="font-semibold text-stone-800 text-sm sm:text-base">Rooms:</span>
                      <span className="ml-2 text-stone-600 text-sm sm:text-base">{roomsList}</span>
                    </div>
                    
                    <div className="bg-white/80 p-3 rounded-2xl">
                      <span className="font-semibold text-stone-800 text-sm sm:text-base">Furniture:</span>
                      <div className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                        1 Sofa (3+2 Seater, Standard Fabric Material), 1 TV Unit (Maximum 6x4 feet Panel and 4x1 Box with 3 drawers, BWP Material, Laminate finish, Basic Accessories), 1 Queen Size Bed (Maximum 6x5 feet, BWP Material, Laminate finish), 1 Modular Wardrobe (Maximum 7X4 feet, 2-Door Swing, BWP Material, Laminate finish, Basic Accessories), Basic Vanity Unit, Modular Kitchen (BWP Material, Matt Finish, Basic Accessories), 1 Dining Table (4x3 laminate table, 4 basic chairs)
                      </div>
                    </div>
                    
                    <div className="bg-white/80 p-3 rounded-2xl">
                      <span className="font-semibold text-stone-800 text-sm sm:text-base">Services:</span>
                      <div className="text-xs sm:text-sm text-stone-600 mt-1">
                        False Ceiling (only living room, maximum 120 square feet), painting (maximum 830 square feet)
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-3 bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 rounded-2xl">
                    <p className="text-xs text-stone-700 leading-relaxed">
                      *This is just an estimated price based on what our clients usually spend. The final cost may be higher or lower depending on things like the materials you choose, the amount of furniture, any necessary construction work (painting, flooring, plumbing, etc.), design features, and the type of wood used. Don't worry, our designers will help you understand everything.
                    </p>
                  </div>
                  
                  <div className="mt-6 space-y-3">
                    <button className="w-full bg-gradient-to-r from-amber-400 to-amber-500 text-stone-800 py-3 font-medium hover:from-amber-300 hover:to-amber-400 transition-all duration-300 text-sm sm:text-base rounded-xl shadow-lg elegant-hover">
                      Visit our website
                    </button>
                    
                    <button
                      onClick={handleBackToStart}
                      className="w-full bg-gradient-to-r from-stone-800 to-stone-900 text-white py-3 font-medium hover:from-stone-700 hover:to-stone-800 transition-all duration-300 rounded-xl text-sm shadow-lg elegant-hover"
                    >
                      ← Back to Start
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center animate-slide-up" style={{animationDelay: '0.7s'}}>
              <div className="bg-gradient-to-r from-amber-50 to-stone-50 p-4 rounded-2xl border border-stone-200">
                <p className="text-sm sm:text-base text-stone-700 font-medium">
                  Thank you for choosing Artisan Studio, <span className="text-amber-600">{contactInfo.name}</span>! 
                  <br className="hidden sm:block" />
                  We'll contact you at <span className="text-amber-600">{contactInfo.mobile}</span> to discuss your project further.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
