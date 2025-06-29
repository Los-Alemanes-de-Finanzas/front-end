import { GenericButton } from '@/app/shared/components/GenericButton';
import React from 'react';

interface ActionButtonsProps {
  onLogin?: () => void;
  onRegister?: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ onLogin, onRegister }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
      <GenericButton 
        text="INICIAR SESIÓN" 
        status="filled" 
        color="sky" 
        onClick={onLogin}
      />
      <GenericButton 
        text="REGISTRARSE" 
        status="outlined" 
        color="sky" 
        onClick={onRegister}
      />
    </div>
  );
};