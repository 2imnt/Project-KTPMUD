import React from 'react';
import { Sparkles } from 'lucide-react';
import { Field } from '../../types';
import FieldCard from '../fields/FieldCard';
import { useApp } from '../../context/AppContext';

interface RecommendedFieldsProps {
  onSelectField: (field: Field) => void;
}

const RecommendedFields: React.FC<RecommendedFieldsProps> = ({ onSelectField }) => {
  const { getRecommendedFields } = useApp();
  const recommendedFields = getRecommendedFields();

  if (recommendedFields.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <div className="flex items-center mb-6">
        <Sparkles className="h-6 w-6 text-amber-500 mr-2" />
        <h2 className="text-2xl font-bold text-gray-900">Recommended For You</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendedFields.map((field) => (
          <FieldCard 
            key={field.id} 
            field={field} 
            onSelect={onSelectField} 
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendedFields;