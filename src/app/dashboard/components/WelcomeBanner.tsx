import React from 'react';

interface WelcomeBannerProps {
  userName?: string;
  subtitle?: string;
}

export const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ 
  userName = "Usuario",
  subtitle = "Gestiona y proyecta tus bonos corporativos de manera eficiente."
}) => {
  return (
    <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg p-6 mb-8 text-white">
      <h2 className="text-2xl font-bold mb-2">
        ¡Bienvenido a tu Dashboard, {userName}!
      </h2>
      <p className="text-teal-100">
        {subtitle}
      </p>
    </div>
  );
};