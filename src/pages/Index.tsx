
import React, { useState } from 'react';
import Header from '../components/Header';
import ProgressIndicator from '../components/ProgressIndicator';
import ConfigurationStep from '../components/ConfigurationStep';
import RoomsStep from '../components/RoomsStep';
import PackageStep from '../components/PackageStep';
import ContactStep from '../components/ContactStep';
import ResultsPage from '../components/ResultsPage';

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  
  // State for form data
  const [selectedConfig, setSelectedConfig] = useState('');
  const [rooms, setRooms] = useState([
    { name: 'Living Room', count: 1 },
    { name: 'Bedroom', count: 1 },
    { name: 'Kitchen', count: 1 },
    { name: 'Dining', count: 1 }
  ]);
  const [selectedPackage, setSelectedPackage] = useState('');
  const [contactInfo, setContactInfo] = useState({});

  const totalSteps = 4;

  const handleConfigSelect = (config: string) => {
    setSelectedConfig(config);
    
    // Update rooms based on BHK selection with proper validation rules
    let newRooms = [
      { name: 'Living Room', count: 1 },
      { name: 'Kitchen', count: 1 },
      { name: 'Dining', count: 1 }
    ];
    
    if (config === '1 BHK') {
      newRooms.push({ name: 'Bedroom', count: 1 });
    } else if (config === '2 BHK') {
      newRooms.push({ name: 'Bedroom', count: 2 });
    } else if (config === '3 BHK') {
      newRooms.push({ name: 'Bedroom', count: 3 });
    }
    
    setRooms(newRooms);
  };

  const getRoomLimits = (roomName: string) => {
    if (!selectedConfig) return { min: 0, max: 3 };
    
    if (roomName === 'Bedroom') {
      if (selectedConfig === '1 BHK') return { min: 0, max: 1 };
      if (selectedConfig === '2 BHK') return { min: 0, max: 2 };
      if (selectedConfig === '3 BHK') return { min: 0, max: 3 };
    }
    
    // For Living Room, Kitchen, and Dining
    if (selectedConfig === '1 BHK') return { min: 0, max: 1 };
    return { min: 0, max: 1 }; // For 2BHK and 3BHK, these rooms have min 0, max 1
  };

  const handleRoomCountChange = (roomName: string, count: number) => {
    const limits = getRoomLimits(roomName);
    const validCount = Math.max(limits.min, Math.min(limits.max, count));
    
    setRooms(rooms.map(room => 
      room.name === roomName ? { ...room, count: validCount } : room
    ));
  };

  const handlePackageSelect = (packageName: string) => {
    setSelectedPackage(packageName);
  };

  const handleContactSubmit = (formData: any) => {
    setContactInfo(formData);
    setShowResults(true);
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (showResults) {
    return (
      <ResultsPage
        configuration={selectedConfig}
        rooms={rooms}
        packageType={selectedPackage}
        contactInfo={contactInfo}
      />
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 font-inter relative overflow-hidden">
      {/* Elegant background with texture patterns */}
      <div className="absolute inset-0 texture-pattern"></div>
      <div className="absolute inset-0 marble-pattern opacity-30"></div>
      
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-stone-200/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-amber-100/20 rounded-full blur-xl animate-gentle-bounce"></div>
      <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-stone-300/15 rounded-full blur-lg animate-float" style={{animationDelay: '2s'}}></div>
      
      <div className="relative z-10 min-h-screen elegant-gradient">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="animate-slide-up">
            <Header />
          </div>
          
          <div className="animate-scale-in" style={{animationDelay: '0.2s'}}>
            <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />
          </div>
          
          <div className="glass-card rounded-2xl shadow-2xl p-6 sm:p-8 md:p-12 mx-2 sm:mx-4 md:mx-0 animate-slide-up elegant-hover" style={{animationDelay: '0.4s'}}>
            {currentStep === 0 && (
              <ConfigurationStep
                selectedConfig={selectedConfig}
                onConfigSelect={handleConfigSelect}
                onNext={nextStep}
              />
            )}
            
            {currentStep === 1 && (
              <RoomsStep
                rooms={rooms}
                onRoomCountChange={handleRoomCountChange}
                onNext={nextStep}
                onPrevious={previousStep}
                getRoomLimits={getRoomLimits}
              />
            )}
            
            {currentStep === 2 && (
              <PackageStep
                selectedPackage={selectedPackage}
                onPackageSelect={handlePackageSelect}
                onNext={nextStep}
                onPrevious={previousStep}
              />
            )}
            
            {currentStep === 3 && (
              <ContactStep
                onSubmit={handleContactSubmit}
                onPrevious={previousStep}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
