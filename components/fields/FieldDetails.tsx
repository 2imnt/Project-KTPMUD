import React, { useState } from 'react';
import { MapPin, Star, Clock, Users, Info, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Field, TimeSlot } from '../../types';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Card, { CardContent, CardHeader } from '../ui/Card';

interface FieldDetailsProps {
  field: Field;
  timeSlots: TimeSlot[];
  selectedDate: string;
  onBack: () => void;
  onSelectTimeSlot: (timeSlot: TimeSlot) => void;
}

const FieldDetails: React.FC<FieldDetailsProps> = ({
  field,
  timeSlots,
  selectedDate,
  onBack,
  onSelectTimeSlot
}) => {
  const [activeImage, setActiveImage] = useState(0);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  // Time slot grouping by availability
  const availableSlots = timeSlots.filter(slot => slot.isAvailable);
  const unavailableSlots = timeSlots.filter(slot => !slot.isAvailable);

  // Handle image navigation
  const nextImage = () => {
    setActiveImage((current) => (current + 1) % field.images.length);
  };

  const prevImage = () => {
    setActiveImage((current) => (current - 1 + field.images.length) % field.images.length);
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Back button */}
      <div className="p-4 border-b border-gray-200">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-emerald-600 transition"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back to search results</span>
        </button>
      </div>

      <div className="md:grid md:grid-cols-3 md:gap-6">
        {/* Field Images */}
        <div className="col-span-2">
          <div className="relative h-80 overflow-hidden">
            <img
              src={field.images[activeImage]}
              alt={field.name}
              className="w-full h-full object-cover"
            />
            
            {field.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-2 text-white transition"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-2 text-white transition"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {field.images.map((_, index) => (
                    <div 
                      key={index}
                      className={`w-2 h-2 rounded-full ${index === activeImage ? 'bg-white' : 'bg-white bg-opacity-50'}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          
          <div className="p-6">
            <div className="flex justify-between items-start">
              <h1 className="text-2xl font-bold text-gray-900">{field.name}</h1>
              <div className="flex items-center">
                <Star className="h-5 w-5 text-amber-500 mr-1" />
                <span className="text-lg font-semibold">{field.rating}</span>
                <span className="text-gray-500 ml-1">({field.reviewCount} reviews)</span>
              </div>
            </div>
            
            <div className="mt-2 flex items-start">
              <MapPin className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
              <p className="ml-1 text-gray-600">
                {field.location.address}, {field.location.city}
              </p>
            </div>
            
            <div className="mt-3 flex items-center">
              <Badge variant="secondary" size="md" className="mr-2">
                {field.type}
              </Badge>
              <div className="text-gray-600">
                <span className="font-semibold text-gray-900">£{field.price.standard}</span> standard / 
                <span className="font-semibold text-gray-900"> £{field.price.peak}</span> peak
              </div>
            </div>
            
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-900">Amenities</h2>
              <div className="mt-2 grid grid-cols-2 gap-y-2 gap-x-4">
                {field.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    <Info className="h-4 w-4 text-emerald-500 mr-2" />
                    <span className="text-gray-600">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Booking Panel */}
        <div className="col-span-1 border-t md:border-t-0 md:border-l border-gray-200">
          <Card className="border-0 shadow-none">
            <CardHeader className="border-b-0">
              <h2 className="text-xl font-semibold text-gray-900">
                Book a slot
              </h2>
              <p className="text-gray-600">
                {formatDate(selectedDate)}
              </p>
            </CardHeader>
            
            <CardContent>
              <div className="mb-6">
                <h3 className="text-md font-medium text-gray-900 mb-3">Available time slots</h3>
                {availableSlots.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2">
                    {availableSlots.map((slot) => (
                      <button
                        key={slot.id}
                        onClick={() => onSelectTimeSlot(slot)}
                        className={`
                          px-3 py-2 rounded-md text-sm border border-gray-200
                          ${slot.isPeak ? 'bg-amber-50' : 'bg-white'}
                          hover:border-emerald-500 hover:bg-emerald-50 transition
                          flex flex-col items-center
                        `}
                      >
                        <span className="font-medium">{slot.startTime} - {slot.endTime}</span>
                        <span className={`text-xs mt-1 ${slot.isPeak ? 'text-amber-600' : 'text-gray-500'}`}>
                          £{slot.price} {slot.isPeak && '(peak)'}
                        </span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-4 bg-gray-50 rounded-md">
                    <p className="text-gray-500">No available slots for this date</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Try another date
                    </Button>
                  </div>
                )}
              </div>
              
              {unavailableSlots.length > 0 && (
                <div>
                  <h3 className="text-md font-medium text-gray-900 mb-3">Booked slots</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {unavailableSlots.map((slot) => (
                      <div
                        key={slot.id}
                        className="px-3 py-2 rounded-md text-sm border border-gray-200 bg-gray-100 opacity-60 flex flex-col items-center"
                      >
                        <span className="font-medium">{slot.startTime} - {slot.endTime}</span>
                        <span className="text-xs mt-1 text-gray-500">Unavailable</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mt-8">
                <Button className="w-full">Find Team Members</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FieldDetails;