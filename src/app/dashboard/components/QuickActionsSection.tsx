import React from 'react';
import { ActionCard } from './ActionCard';

interface QuickActionsSectionProps {
  onNewProjection?: () => void;
  onViewBonds?: () => void;
  onSystemConfig?: () => void;
  onFinancialAnalysis?: () => void;
  onManageTerms?: () => void;
}

export const QuickActionsSection: React.FC<QuickActionsSectionProps> = ({
  onNewProjection,
  onViewBonds,
  onSystemConfig,
  onFinancialAnalysis,
  onManageTerms
}) => {
  const actions = [
    {
      title: "Nueva Proyección de Bono",
      description: "Inicia una nueva simulación de flujo de caja para un bono corporativo. El método siempre está disponible para tu aplicación.",
      buttonText: "Iniciar Proyección",
      onClick: onNewProjection || (() => console.log('Nueva Proyección')),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      title: "Mis Bonos Guardados",
      description: "Accede, edita o modifica las valoraciones de bonos que has registrado previamente.",
      buttonText: "Ver Mis Bonos",
      onClick: onViewBonds || (() => console.log('Ver Bonos')),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      title: "Configuración del Sistema",
      description: "Define la moneda, el tipo de tasa de interés (efectiva o nominal) y la capitalización para tus cálculos.",
      buttonText: "Ir a Configuración",
      onClick: onSystemConfig || (() => console.log('Configuración')),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      title: "Análisis Financiero",
      description: "Calcula indicadores clave como la convexidad, duración, duración modificada, TCEA, TREA y el precio máximo del título valor.",
      buttonText: "Realizar Análisis",
      onClick: onFinancialAnalysis || (() => console.log('Análisis Financiero')),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Plazos de Gracia",
      description: "Incluye la posibilidad de otorgar plazos de gracia parciales o totales al inicio del plan de pagos de tus bonos.",
      buttonText: "Gestionar Plazos",
      onClick: onManageTerms || (() => console.log('Gestionar Plazos')),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Acciones Rápidas</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {actions.map((action, index) => (
          <ActionCard
            key={index}
            title={action.title}
            description={action.description}
            buttonText={action.buttonText}
            onButtonClick={action.onClick}
            icon={action.icon}
          />
        ))}
      </div>
    </div>
  );
};