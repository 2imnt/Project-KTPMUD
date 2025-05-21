import React from 'react';
import { MapPin, Users, Star } from 'lucide-react';
import { Field, FieldType } from '../../types';
import Card, { CardContent, CardFooter } from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

interface FieldCardProps {
  field: Field;
  onSelect: (field: Field) => void;
}

const FieldCard: React.FC<FieldCardProps> = ({ field, onSelect }) => {
  // Get field type badge variant
  const getFieldTypeBadge = (type: FieldType) => {
    switch (type) {
      case FieldType.FIVE_A_SIDE:
        return { variant: 'primary' as const, label: '5-a-side' };
      case FieldType.SEVEN_A_SIDE:
        return { variant: 'secondary' as const, label: '7-a-side' };
      case FieldType.ELEVEN_A_SIDE:
        return { variant: 'warning' as const, label: '11-a-side' };
      default:
        return { variant: 'default' as const, label: type };
    }
  };

  const typeBadge = getFieldTypeBadge(field.type);

  return (
    <Card className="h-full transition-transform duration-200 hover:transform hover:scale-102 hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <img
          src={field.images[0]}
          alt={field.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-4 right-4">
          <Badge variant={typeBadge.variant} size="md" className="font-semibold">
            {typeBadge.label}
          </Badge>
        </div>
      </div>
      
      <CardContent className="pt-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {field.name}
          </h3>
          <div className="flex items-center ml-2">
            <Star className="h-4 w-4 text-amber-500 mr-1" />
            <span className="text-sm font-medium text-gray-700">
              {field.rating} <span className="text-gray-500">({field.reviewCount})</span>
            </span>
          </div>
        </div>
        
        <div className="mt-2 flex items-start">
          <MapPin className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
          <p className="ml-1 text-sm text-gray-600 line-clamp-1">
            {field.location.address}, {field.location.city}
          </p>
        </div>
        
        <div className="mt-3">
          <h4 className="text-sm font-medium text-gray-900">Amenities:</h4>
          <div className="mt-1 flex flex-wrap gap-1">
            {field.amenities.slice(0, 3).map((amenity, index) => (
              <Badge key={index} variant="default" size="sm">
                {amenity}
              </Badge>
            ))}
            {field.amenities.length > 3 && (
              <Badge variant="default" size="sm">
                +{field.amenities.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center border-t border-gray-100">
        <div className="text-gray-900">
          <span className="font-semibold text-lg">£{field.price.standard}</span>
          <span className="text-sm text-gray-500"> / hour</span>
        </div>
        <Button onClick={() => onSelect(field)}>
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FieldCard;