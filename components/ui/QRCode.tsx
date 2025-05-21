import React from 'react';

interface QRCodeProps {
  value: string;
  size?: number;
  className?: string;
}

// This is a placeholder component. In a real application, you would use a QR code generation library.
const QRCode: React.FC<QRCodeProps> = ({ value, size = 200, className = '' }) => {
  // In a real application, this would use a library to generate a QR code
  // For now, we'll create a simple placeholder
  
  return (
    <div 
      className={`relative flex items-center justify-center bg-white border-4 border-emerald-500 rounded-lg ${className}`}
      style={{ width: size, height: size }}
    >
      <div className="absolute inset-4 grid grid-cols-5 grid-rows-5 gap-1">
        {Array.from({ length: 25 }).map((_, index) => {
          // Create a pattern based on the value string
          const shouldFill = (index % 7 === 0) || 
                            ((value.charCodeAt(index % value.length) % 4) === 0) ||
                            (index === 6) || (index === 8) || (index === 16) || (index === 18);
          
          // Add fixed patterns for QR code corners
          const isCorner = index === 0 || index === 4 || index === 20 || index === 24;
          const isCornerPattern = index === 0 || index === 4 || index === 20 || index === 24 || 
                                 index === 1 || index === 5 || index === 21 || index === 25 ||
                                 index === 6 || index === 10 || index === 26 || index === 30;
          
          return (
            <div 
              key={index} 
              className={`
                ${(shouldFill || isCorner) ? 'bg-emerald-600' : 'bg-transparent'}
                ${isCorner ? 'rounded-lg' : ''}
              `}
            />
          );
        })}
      </div>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white p-2 rounded-md shadow-sm">
          <span className="text-xs text-emerald-600 font-semibold">{value}</span>
        </div>
      </div>
    </div>
  );
};

export default QRCode;