import React from 'react';

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({ 
  label, 
  children, 
  className = '' 
}) => {
  return (
    <div className={`space-y-3 ${className}`}>
      <label className="text-base font-semibold text-gray-700">
        {label}
      </label>
      {children}
    </div>
  );
};