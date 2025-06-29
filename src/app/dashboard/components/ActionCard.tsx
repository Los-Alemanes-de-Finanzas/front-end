import React from 'react';
import { GenericButton } from '../../shared/components/GenericButton';

interface ActionCardProps {
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
  icon?: React.ReactNode;
  buttonColor?: 'sky' | 'teal' | 'blue' | 'green' | 'red' | 'gray' | 'purple' | 'indigo';
}

export const ActionCard: React.FC<ActionCardProps> = ({
  title,
  description,
  buttonText,
  onButtonClick,
  icon,
  buttonColor = 'teal'
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      {icon && (
        <div className="mb-4 text-teal-500">
          {icon}
        </div>
      )}
      
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        {title}
      </h3>
      
      <p className="text-gray-600 text-sm mb-6 leading-relaxed">
        {description}
      </p>
      
      <GenericButton
        text={buttonText}
        status="filled"
        color={buttonColor}
        size="sm"
        onClick={onButtonClick}
      />
    </div>
  );
};