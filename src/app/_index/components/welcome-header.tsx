import React from 'react';

export const WelcomeHeader: React.FC = () => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
        Bienvenido a BonoPlan
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Analiza y proyecta el flujo de caja de Bonos Corporativos de forma sencilla y precisa. Con 
        BonoPlan, obtén cálculos de convexidad, duración, TCEA, TREA y el precio máximo de 
        mercado. Configura la moneda y el tipo de tasa de interés para un análisis adaptado a tus 
        necesidades.
      </p>
    </div>
  );
};