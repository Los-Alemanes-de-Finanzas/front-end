'use client';
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const selectedOption = options.find(option => option.value === value);
  
  return (
    <>
        <div className="relative w-full">
            <button
                type="button"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-left text-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 flex items-center justify-between"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className={selectedOption ? 'text-gray-900' : 'text-gray-500'}>
                {selectedOption ? selectedOption.label : placeholder}
                </span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                {options.map((option) => (
                    <button
                    key={option.value}
                    type="button"
                    className="w-full px-4 py-3 text-left text-gray-900 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none first:rounded-t-lg last:rounded-b-lg"
                    onClick={() => {
                        onChange(option.value);
                        setIsOpen(false);
                    }}
                    >
                    {option.label}
                    </button>
                ))}
                </div>
            )}
        </div>
    </>
  );
};