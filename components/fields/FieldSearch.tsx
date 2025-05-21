import React, { useState } from 'react';
import { Search, Calendar, MapPin, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FieldType, SearchFilters } from '../../types';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import DatePicker from '../ui/DatePicker';

const fieldTypeOptions = [
  { value: '', label: 'Any field type' },
  { value: FieldType.FIVE_A_SIDE, label: '5-a-side' },
  { value: FieldType.SEVEN_A_SIDE, label: '7-a-side' },
  { value: FieldType.ELEVEN_A_SIDE, label: '11-a-side' },
];

const timeOptions = Array.from({ length: 14 }, (_, i) => {
  const hour = i + 8; // Start from 8 AM
  return {
    value: `${hour}:00`,
    label: `${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? 'PM' : 'AM'}`,
  };
});

const FieldSearch: React.FC = () => {
  const { searchFilters, setSearchFilters } = useApp();
  const [expandedSearch, setExpandedSearch] = useState(false);
  
  const [localFilters, setLocalFilters] = useState<SearchFilters>(searchFilters);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLocalFilters({
      ...localFilters,
      [name]: value,
    });
  };

  const handleDateChange = (date: string) => {
    setLocalFilters({
      ...localFilters,
      date,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchFilters(localFilters);
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <DatePicker
            label="When do you want to play?"
            selectedDate={localFilters.date}
            onDateChange={handleDateChange}
            className="col-span-1"
          />
          
          <Input
            label="Where?"
            name="location"
            value={localFilters.location}
            onChange={handleChange}
            placeholder="City, postcode, or venue name"
            icon={<MapPin className="h-5 w-5" />}
            className="col-span-1"
          />
          
          <Select
            label="Field type"
            name="fieldType"
            value={localFilters.fieldType}
            onChange={handleChange}
            options={fieldTypeOptions}
            className="col-span-1"
          />
        </div>
        
        {expandedSearch && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Select
              label="From"
              name="startTime"
              value={localFilters.startTime}
              onChange={handleChange}
              options={timeOptions}
              icon={<Clock className="h-5 w-5" />}
            />
            
            <Select
              label="To"
              name="endTime"
              value={localFilters.endTime}
              onChange={handleChange}
              options={timeOptions}
              icon={<Clock className="h-5 w-5" />}
            />
          </div>
        )}
        
        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setExpandedSearch(!expandedSearch)}
            className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
          >
            {expandedSearch ? 'Simple search' : 'Advanced search options'}
          </button>
          
          <Button type="submit" icon={<Search className="h-4 w-4" />}>
            Search Fields
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FieldSearch;