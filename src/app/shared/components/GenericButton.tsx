import React from 'react';

interface ButtonProps {
  text: string;
  status?: 'filled' | 'outlined' | 'text';
  color?: 'sky' | 'teal' | 'blue' | 'green' | 'red' | 'gray' | 'purple' | 'indigo';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
}

export const GenericButton: React.FC<ButtonProps> = ({ 
  text,
  status = 'filled',
  color = 'sky',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  className = '',
  type = 'button',
  fullWidth = false
}) => {
  const baseClasses = 'font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md inline-flex items-center justify-center';
  
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl'
  };

  // Color and status combinations
  const getColorClasses = () => {
    const colorMap = {
      sky: {
        filled: 'bg-sky-500 text-white hover:bg-sky-600 focus:ring-sky-500 disabled:bg-sky-300',
        outlined: 'bg-transparent text-sky-500 border-2 border-sky-500 hover:bg-sky-50 focus:ring-sky-500 disabled:text-sky-300 disabled:border-sky-300',
        text: 'bg-transparent text-sky-500 hover:bg-sky-50 focus:ring-sky-500 disabled:text-sky-300'
      },
      teal: {
        filled: 'bg-teal-500 text-white hover:bg-teal-600 focus:ring-teal-500 disabled:bg-teal-300',
        outlined: 'bg-transparent text-teal-500 border-2 border-teal-500 hover:bg-teal-50 focus:ring-teal-500 disabled:text-teal-300 disabled:border-teal-300',
        text: 'bg-transparent text-teal-500 hover:bg-teal-50 focus:ring-teal-500 disabled:text-teal-300'
      },
      blue: {
        filled: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500 disabled:bg-blue-300',
        outlined: 'bg-transparent text-blue-500 border-2 border-blue-500 hover:bg-blue-50 focus:ring-blue-500 disabled:text-blue-300 disabled:border-blue-300',
        text: 'bg-transparent text-blue-500 hover:bg-blue-50 focus:ring-blue-500 disabled:text-blue-300'
      },
      green: {
        filled: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500 disabled:bg-green-300',
        outlined: 'bg-transparent text-green-500 border-2 border-green-500 hover:bg-green-50 focus:ring-green-500 disabled:text-green-300 disabled:border-green-300',
        text: 'bg-transparent text-green-500 hover:bg-green-50 focus:ring-green-500 disabled:text-green-300'
      },
      red: {
        filled: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 disabled:bg-red-300',
        outlined: 'bg-transparent text-red-500 border-2 border-red-500 hover:bg-red-50 focus:ring-red-500 disabled:text-red-300 disabled:border-red-300',
        text: 'bg-transparent text-red-500 hover:bg-red-50 focus:ring-red-500 disabled:text-red-300'
      },
      gray: {
        filled: 'bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500 disabled:bg-gray-300',
        outlined: 'bg-transparent text-gray-500 border-2 border-gray-500 hover:bg-gray-50 focus:ring-gray-500 disabled:text-gray-300 disabled:border-gray-300',
        text: 'bg-transparent text-gray-500 hover:bg-gray-50 focus:ring-gray-500 disabled:text-gray-300'
      },
      purple: {
        filled: 'bg-purple-500 text-white hover:bg-purple-600 focus:ring-purple-500 disabled:bg-purple-300',
        outlined: 'bg-transparent text-purple-500 border-2 border-purple-500 hover:bg-purple-50 focus:ring-purple-500 disabled:text-purple-300 disabled:border-purple-300',
        text: 'bg-transparent text-purple-500 hover:bg-purple-50 focus:ring-purple-500 disabled:text-purple-300'
      },
      indigo: {
        filled: 'bg-indigo-500 text-white hover:bg-indigo-600 focus:ring-indigo-500 disabled:bg-indigo-300',
        outlined: 'bg-transparent text-indigo-500 border-2 border-indigo-500 hover:bg-indigo-50 focus:ring-indigo-500 disabled:text-indigo-300 disabled:border-indigo-300',
        text: 'bg-transparent text-indigo-500 hover:bg-indigo-50 focus:ring-indigo-500 disabled:text-indigo-300'
      }
    };

    return colorMap[color][status];
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled || loading ? 'cursor-not-allowed opacity-60' : 'cursor-pointer';

  return (
    <button 
      type={type}
      className={`${baseClasses} ${sizeClasses[size]} ${getColorClasses()} ${widthClass} ${disabledClass} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {text}
    </button>
  );
};