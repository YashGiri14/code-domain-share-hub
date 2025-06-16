
import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface Room {
  name: string;
  count: number;
}

interface RoomsStepProps {
  rooms: Room[];
  onRoomCountChange: (roomName: string, count: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  getRoomLimits: (roomName: string) => { min: number; max: number };
}

const RoomsStep: React.FC<RoomsStepProps> = ({
  rooms,
  onRoomCountChange,
  onNext,
  onPrevious,
  getRoomLimits
}) => {
  return (
    <div className="animate-slide-up">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="heading-primary text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-stone-800 mb-4">
          Choose the rooms
        </h2>
        <p className="text-elegant text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
          We'll bring your vision to life
        </p>
      </div>
      
      <div className="max-w-lg mx-auto space-y-6 sm:space-y-8 mb-12 sm:mb-16">
        {rooms.map((room, index) => {
          const limits = getRoomLimits(room.name);
          return (
            <div 
              key={room.name} 
              className="animate-slide-in-left elegant-hover"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="flex items-center justify-between p-6 bg-white/90 rounded-2xl shadow-md border border-stone-200">
                <span className="heading-secondary text-lg sm:text-xl md:text-2xl text-stone-800">{room.name}</span>
                <div className="flex items-center space-x-4 sm:space-x-6">
                  <button
                    onClick={() => onRoomCountChange(room.name, room.count - 1)}
                    disabled={room.count <= limits.min}
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 elegant-hover ${
                      room.count <= limits.min
                        ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                        : 'bg-stone-800 text-white hover:bg-stone-700 shadow-lg'
                    }`}
                  >
                    <Minus size={16} className="sm:w-5 sm:h-5" />
                  </button>
                  <span className="text-xl sm:text-2xl md:text-3xl font-semibold w-8 sm:w-10 text-center text-stone-800">{room.count}</span>
                  <button
                    onClick={() => onRoomCountChange(room.name, room.count + 1)}
                    disabled={room.count >= limits.max}
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 elegant-hover ${
                      room.count >= limits.max
                        ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                        : 'bg-stone-800 text-white hover:bg-stone-700 shadow-lg'
                    }`}
                  >
                    <Plus size={16} className="sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between space-x-4 animate-scale-in" style={{animationDelay: '0.5s'}}>
        <button
          onClick={onPrevious}
          className="px-8 sm:px-10 md:px-12 py-3 sm:py-4 bg-white text-stone-800 font-medium hover:bg-stone-50 transition-all duration-300 rounded-xl text-base sm:text-lg border border-stone-300 elegant-hover"
        >
          Previous
        </button>
        <button
          onClick={onNext}
          className="px-8 sm:px-10 md:px-12 py-3 sm:py-4 bg-gradient-to-r from-stone-800 to-stone-900 text-white font-medium hover:from-stone-700 hover:to-stone-800 transition-all duration-300 rounded-xl text-base sm:text-lg shadow-lg elegant-hover"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default RoomsStep;
