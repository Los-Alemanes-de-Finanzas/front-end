'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"
import { GenericButton } from "@/app/shared/components/GenericButton";
import { IndicatorField } from "./IndicatorField";
import { Header } from "../../components/Header";
import { CustomSelect, SelectOption } from "@/app/shared/components/CustomSelect";

const FinancialAnalysisContent: React.FC = () => {
  const [selectedBond, setSelectedBond] = useState('');
  const [indicators, setIndicators] = useState({
    tceaEmisor: 'Valor calculado',
    treaBonista: 'Valor calculado',
    convexidad: 'Valor calculado',
    precioActual: 'Valor calculado',
    duracion: 'Valor calculado',
    utilidadPerdida: 'Valor calculado',
    duracionModificada: 'Valor calculado',
    precioMaximoMercado: 'Valor calculado'
  });

  const bondOptions: SelectOption[] = [
    { value: 'bond1', label: 'Bono Corporativo ABC - 5.5% 2028' },
    { value: 'bond2', label: 'Bono del Tesoro - 3.2% 2030' },
    { value: 'bond3', label: 'Bono Municipal XYZ - 4.8% 2025' },
    { value: 'bond4', label: 'Bono Verde DEF - 6.1% 2032' }
  ];

  const [username, setUsername] = useState('');

  const handleAnalyze = () => {
    if (!selectedBond) {
      alert('Por favor seleccione un bono para analizar');
      return;
    }
    
    // Simulate calculation
    console.log('Analizando bono:', selectedBond);
    
    // Update with calculated values (this would come from your API)
    setIndicators({
      tceaEmisor: '4.25%',
      treaBonista: '4.18%',
      convexidad: '12.34',
      precioActual: '$1,024.50',
      duracion: '5.67 años',
      utilidadPerdida: '$2,345.67',
      duracionModificada: '5.42',
      precioMaximoMercado: '$1,045.30'
    });
  };

    useEffect(() => {
      const savedUsername = localStorage.getItem('username');
    
      if (savedUsername) setUsername(savedUsername);
    }, []);
    const router = useRouter();

    const userInitial = username.charAt(0).toUpperCase();

    const handleLogout = () => {
        console.log('Logging out...');
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header userName={username} userInitial={userInitial} onLogout={handleLogout} />
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <h1 className="text-3xl font-bold text-center text-gray-900 my-16">
                ANÁLISIS FINANCIERO DE BONOS
                </h1>
                
                {/* Bond Selection Section */}
                <div className="mb-20">
                <div className="flex items-center gap-8 mb-8">
                    <div className="flex-1">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">
                        Selecciona el bono a analizar
                    </h2>
                    <CustomSelect
                        options={bondOptions}
                        value={selectedBond}
                        onChange={setSelectedBond}
                        placeholder="Option"
                    />
                    </div>
                    <div className="flex-shrink-0 mt-8">
                    <GenericButton
                        text="Analizar"
                        color="teal"
                        status="filled"
                        size="md"
                        onClick={handleAnalyze}
                        className="rounded-lg px-8"
                    />
                    </div>
                </div>
                </div>

                {/* Indicators Section */}
                <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-12">
                    INDICADORES DEL BONO
                </h2>
                
                {/* Indicators Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                    <IndicatorField 
                    label="TCEA - Emisor" 
                    value={indicators.tceaEmisor} 
                    />
                    <IndicatorField 
                    label="TREA - Bonista" 
                    value={indicators.treaBonista} 
                    />
                    <IndicatorField 
                    label="Convexidad" 
                    value={indicators.convexidad} 
                    />
                    <IndicatorField 
                    label="Precio actual" 
                    value={indicators.precioActual} 
                    />
                    <IndicatorField 
                    label="Duración" 
                    value={indicators.duracion} 
                    />
                    <IndicatorField 
                    label="Utilidad/Pérdida" 
                    value={indicators.utilidadPerdida} 
                    />
                    <IndicatorField 
                    label="Duración modificada" 
                    value={indicators.duracionModificada} 
                    />
                    <IndicatorField 
                    label="Precio máximo de mercado" 
                    value={indicators.precioMaximoMercado} 
                    />
                </div>
                </div>
            </div>
        </div>
    );
};

export default FinancialAnalysisContent;