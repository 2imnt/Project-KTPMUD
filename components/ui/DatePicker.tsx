import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

interface DatePickerProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
  label?: string;
  minDate?: string;
  maxDate?: string;
  className?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onDateChange,
  label,
  minDate = new Date().toISOString().split('T')[0], // Today as default min date
  maxDate,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Format date for display
  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  // Generate date buttons for next 14 days
  const generateDateButtons = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const dateStr = date.toISOString().split('T')[0];
      const isSelected = dateStr === selectedDate;
      const isToday = i === 0;
      
      dates.push(
        <button
          key={dateStr}
          onClick={() => {
            onDateChange(dateStr);
            setIsOpen(false);
          }}
          className={`
            px-4 py-2 rounded-md text-sm transition-colors
            ${isSelected 
              ? 'bg-emerald-500 text-white font-medium' 
              : 'hover:bg-gray-100'
            }
            ${isToday ? 'font-semibold' : ''}
          `}
          type="button"
        >
          {isToday ? 'Today' : formatDate(dateStr).split(',')[0]}
          <div className="text-xs mt-1">
            {date.getDate()}/{date.getMonth() + 1}
          </div>
        </button>
      );
    }
    
    return dates;
  };

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center px-3 py-2 border border-gray-300 rounded-md bg-white text-left focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        >
          <Calendar className="h-5 w-5 text-gray-400 mr-2" />
          <span>{formatDate(selectedDate)}</span>
        </button>
        
        {isOpen && (
          <div className="absolute z-10 mt-1 w-72 bg-white shadow-lg rounded-md ring-1 ring-black ring-opacity-5 p-4">
            <div className="flex overflow-x-auto space-x-2 pb-2">
              {generateDateButtons()}
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Or select a specific date:
              </label>
              <input
                type="date"
                value={selectedDate}
                min={minDate}
                max={maxDate}
                onChange={(e) => onDateChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DatePicker;