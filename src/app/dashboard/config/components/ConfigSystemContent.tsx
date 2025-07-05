'use client'
import { GenericButton } from "@/app/shared/components/GenericButton";
import { useState } from "react";
import { CustomSelect, SelectOption } from "./CustomSelect";

const ConfigSystemContent: React.FC = () => {
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [selectedInterestRate, setSelectedInterestRate] = useState('');

  const currencyOptions: SelectOption[] = [
    { value: 'usd', label: 'USD - Dólar Estadounidense' },
    { value: 'eur', label: 'EUR - Euro' },
    { value: 'pen', label: 'PEN - Sol Peruano' },
  ];

  const interestRateOptions: SelectOption[] = [
    { value: '2.5', label: '2.5%' },
    { value: '3.0', label: '3.0%' },
    { value: '3.5', label: '3.5%' },
    { value: '4.0', label: '4.0%' },
    { value: '4.5', label: '4.5%' },
    { value: '5.0', label: '5.0%' }
  ];

  const handleSave = () => {
    console.log('Guardando configuración:', {
      currency: selectedCurrency,
      interestRate: selectedInterestRate
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-16">
          CONFIGURACIÓN DEL SISTEMA
        </h1>
        
        {/* Configuration Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Currency Selection */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Moneda predeterminada
            </h2>
            <CustomSelect
              options={currencyOptions}
              value={selectedCurrency}
              onChange={setSelectedCurrency}
              placeholder="Option"
            />
          </div>

          {/* Interest Rate Selection */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Tasa de interés predeterminada
            </h2>
            <CustomSelect
              options={interestRateOptions}
              value={selectedInterestRate}
              onChange={setSelectedInterestRate}
              placeholder="Option"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center">
          <div className="w-64">
            <GenericButton
              text="Guardar"
              color="teal"
              status="filled"
              size="lg"
              fullWidth={true}
              onClick={handleSave}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigSystemContent;