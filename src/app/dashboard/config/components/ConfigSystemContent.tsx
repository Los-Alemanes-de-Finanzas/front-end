'use client'

import { CustomSelect, SelectOption } from "@/app/shared/components/CustomSelect";
import { GenericButton } from "@/app/shared/components/GenericButton";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { useRouter, useSearchParams } from "next/navigation";

const ConfigSystemContent: React.FC = () => {
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [selectedInterestRate, setSelectedInterestRate] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const savedCurrency = localStorage.getItem('currencyOption');
    const savedRate = localStorage.getItem('interestRate');

    if (savedCurrency) setSelectedCurrency(savedCurrency);
    if (savedRate) setSelectedInterestRate(savedRate);
  }, []);

  const router = useRouter();
  const searchParams = useSearchParams();
  const userName = searchParams.get('username') || 'Usuario';
  const userInitial = userName.charAt(0).toUpperCase();

  const currencyOptions: SelectOption[] = [
    { value: 'USD', label: 'USD - Dólar Estadounidense' },
    { value: 'EUR', label: 'EUR - Euro' },
    { value: 'PEN', label: 'PEN - Sol Peruano' },
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
    localStorage.setItem('currencyOption', selectedCurrency);
    localStorage.setItem('interestRate', selectedInterestRate);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header userName={userName} userInitial={userInitial} onLogout={handleLogout} />
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-gray-900 my-16">
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
        <div className="flex flex-col items-center space-y-4">
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

          {/* Success Message */}
          {showMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg text-center w-full max-w-md">
              Configuración guardada correctamente.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfigSystemContent;
