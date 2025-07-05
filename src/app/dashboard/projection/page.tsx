import React from 'react';
import { GenericButton } from "@/app/shared/components/GenericButton";
import { useBondForm } from './hooks/useBondForm';
import { BondBasicInfo } from './components/BondBasicInfo';
import { InitialCosts } from './components/InitialCosts';
import { Suspense } from 'react';

export const NuevaProyeccionBono: React.FC = () => {
  const { formData, updateField, handleSubmit, isLoading } = useBondForm();

  return (
    <Suspense>
        <div className="bg-gray-100 min-h-screen p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
                NUEVA PROYECCIÓN DE BONO
                </h1>
                
                <p className="text-gray-600 mb-12">
                Completa los siguientes campos:
                </p>

                {/* Basic Bond Information Section */}
                <div className="mb-16">
                <BondBasicInfo 
                    formData={formData} 
                    updateField={updateField} 
                />
                </div>

                {/* Initial Costs Section */}
                <div className="mb-8">
                <InitialCosts 
                    formData={formData} 
                    updateField={updateField} 
                />
                </div>

                {/* Save Button */}
                <div className="flex justify-center pt-8">
                <GenericButton
                    text="Guardar"
                    color="teal"
                    status="filled"
                    size="lg"
                    onClick={handleSubmit}
                    loading={isLoading}
                    className="rounded-lg px-12"
                />
                </div>
            </div>
            </div>
    </Suspense>
  );
};