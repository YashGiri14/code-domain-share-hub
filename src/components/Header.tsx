
import React from 'react';

const Header = () => {
  return (
    <div className="text-center mb-8 md:mb-12">
      <div className="inline-block mb-6 animate-gentle-bounce">
        <div className="relative">
          <div className="absolute inset-0 bg-white/50 rounded-3xl blur-lg"></div>
          <img
            src="/lovable-uploads/0e7764bc-df65-4205-841f-740f7b35349b.png"
            alt="Artisan Studio"
            className="relative h-24 sm:h-28 md:h-32 lg:h-36 w-auto mx-auto drop-shadow-2xl"
          />
        </div>
      </div>
      
      <div className="animate-slide-up" style={{animationDelay: '0.3s'}}>
        <h1 className="heading-primary text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-stone-800 mb-3">
          Artisan Studio
        </h1>
        <p className="text-elegant text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
          Crafting exceptional interiors that reflect your unique style and elevate your living experience
        </p>
      </div>
    </div>
  );
};

export default Header;
