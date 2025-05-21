import React, { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = '', ...props }, ref) => {
    const baseStyles = 'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition duration-150';
    const defaultStyles = 'border-gray-300 focus:border-emerald-500 focus:ring-emerald-500';
    const errorStyles = 'border-red-500 focus:border-red-500 focus:ring-red-500';
    const iconStyles = icon ? 'pl-10' : '';
    
    const computedStyles = `
      ${baseStyles}
      ${error ? errorStyles : defaultStyles}
      ${iconStyles}
      ${className}
    `;

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
              {icon}
            </div>
          )}
          <input ref={ref} className={computedStyles} {...props} />
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;