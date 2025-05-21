import React from 'react';
import { Calendar, Search, MapPin, Users, Sparkles } from 'lucide-react';
import Button from '../ui/Button';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-emerald-800 text-white">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url(https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg)',
          backgroundBlendMode: 'overlay',
        }}
      >
        <div className="absolute inset-0 bg-emerald-900 opacity-70"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="md:flex md:items-center md:justify-between">
          <div className="md:max-w-xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Find and Book Football Fields with AI Assistance
            </h1>
            <p className="text-xl text-emerald-100 mb-8">
              Discover the perfect field for your game, powered by smart recommendations 
              and real-time availability.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg"
                className="bg-white text-emerald-700 hover:bg-emerald-50"
                icon={<Search className="h-5 w-5" />}
              >
                Find Fields Now
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-emerald-700"
                icon={<Users className="h-5 w-5" />}
              >
                Find Teammates
              </Button>
            </div>
          </div>
          
          <div className="hidden md:block md:ml-10 lg:ml-20">
            <div className="bg-white text-gray-900 rounded-lg shadow-xl p-6 max-w-md mt-8 md:mt-0 transform rotate-2">
              <h3 className="text-xl font-semibold mb-4">Why FootballField?</h3>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 bg-emerald-100 rounded-full p-1">
                    <Calendar className="h-5 w-5 text-emerald-600" />
                  </div>
                  <p className="ml-3 text-gray-600">
                    <span className="font-medium text-gray-900">Real-time availability</span> - 
                    See which fields are free when you want to play
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 bg-emerald-100 rounded-full p-1">
                    <MapPin className="h-5 w-5 text-emerald-600" />
                  </div>
                  <p className="ml-3 text-gray-600">
                    <span className="font-medium text-gray-900">Smart location search</span> - 
                    Find fields near you or any location
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 bg-emerald-100 rounded-full p-1">
                    <Users className="h-5 w-5 text-emerald-600" />
                  </div>
                  <p className="ml-3 text-gray-600">
                    <span className="font-medium text-gray-900">Team matching</span> - 
                    Connect with other players or find teammates
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 bg-emerald-100 rounded-full p-1">
                    <Sparkles className="h-5 w-5 text-emerald-600" />
                  </div>
                  <p className="ml-3 text-gray-600">
                    <span className="font-medium text-gray-900">AI recommendations</span> - 
                    Get personalized field suggestions
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;