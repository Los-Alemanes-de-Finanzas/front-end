'use client';
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation"
import { GenericButton } from "@/app/shared/components/GenericButton";
import { IndicatorField } from "./IndicatorField";
import { Header } from "../../components/Header";
import { CustomSelect, SelectOption } from "@/app/shared/components/CustomSelect";
import fetchAllBonds from "@/api/requests/bond/fetchAll";
import { Bond } from "@/misc/types/Bond";
import fetchYield from "@/api/requests/bond/fetchYields";
import calculateInitialCosts from "@/api/requests/bond/calculateInitialCosts";
import calculateFinalCosts from "@/api/requests/bond/calculateFinalCosts";

// Types for API responses
interface LoaderData {
  bonds: Bond[];
  error?: string;
}

interface YieldData {
  bondId: number;
  tcea: number;
  trea: number;
  macaulayDuration: number;
  modifiedDuration: number;
  convexity: number;
  currentPrice: number;
  profitOrLoss: number;
  maxMarketPrice: number;
}

interface IndicatorsState {
  tceaEmisor: string;
  treaBonista: string;
  convexidad: string;
  precioActual: string;
  duracion: string;
  utilidadPerdida: string;
  duracionModificada: string;
  precioMaximoMercado: string;
}

// Loader function for bonds
export const loader = async (): Promise<LoaderData> => {
  try {
    const bonds = await fetchAllBonds();
    return { bonds: bonds || [] };
  } catch (error) {
    console.error("Error fetching bonds", error);
    return {
      bonds: [],
      error: error instanceof Error ? error.message : 'Failed to fetch bonds'
    };
  }
};

// Loading state component
const LoadingState = ({ message = "Cargando..." }: { message?: string }) => (
  <div className="flex justify-center items-center py-8">
    <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-gray-500 bg-white">
      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      {message}
    </div>
  </div>
);

// Error state component
const ErrorState = ({ error, onRetry }: { error: string; onRetry: () => void }) => (
  <div className="text-center py-8">
    <div className="mb-4">
      <svg 
        className="mx-auto h-8 w-8 text-red-400" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.958-.833-2.728 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" 
        />
      </svg>
    </div>
    <h3 className="text-lg font-medium text-gray-900 mb-2">
      Error al cargar los datos
    </h3>
    <p className="text-gray-500 mb-4">
      {error}
    </p>
    <GenericButton
      text="Reintentar"
      color="teal"
      status="outlined"
      size="md"
      onClick={onRetry}
      className="rounded-lg"
    />
  </div>
);

// Empty bonds state
const EmptyBondsState = () => (
  <div className="text-center py-8">
    <div className="mb-4">
      <svg 
        className="mx-auto h-8 w-8 text-gray-400" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
        />
      </svg>
    </div>
    <h3 className="text-lg font-medium text-gray-900 mb-2">
      No hay bonos disponibles
    </h3>
    <p className="text-gray-500">
      Primero debes crear un bono para poder analizarlo financieramente.
    </p>
  </div>
);

// Custom hook for managing user session safely
const useUserSession = () => {
  const [username, setUsername] = useState('');
  const [userInitial, setUserInitial] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  const searchParams = useSearchParams();

  useEffect(() => {
    // Get username from URL params first (priority)
    const urlUsername = searchParams.get('username');
    
    if (urlUsername) {
      setUsername(urlUsername);
      setUserInitial(urlUsername.charAt(0).toUpperCase());
      setIsLoaded(true);
      
      // Save to localStorage for future use (client-side only)
      if (typeof window !== 'undefined') {
        localStorage.setItem('username', urlUsername);
      }
    } else {
      // Fallback to localStorage if no URL param (client-side only)
      if (typeof window !== 'undefined') {
        const savedUsername = localStorage.getItem('username');
        if (savedUsername) {
          setUsername(savedUsername);
          setUserInitial(savedUsername.charAt(0).toUpperCase());
        } else {
          // Default fallback
          setUsername('Usuario');
          setUserInitial('U');
        }
      } else {
        // Server-side fallback
        setUsername('Usuario');
        setUserInitial('U');
      }
      setIsLoaded(true);
    }
  }, [searchParams]);

  return { username, userInitial, isLoaded };
};

const FinancialAnalysisContent: React.FC = () => {
  // Form state
  const [selectedBond, setSelectedBond] = useState('');
  const [indicators, setIndicators] = useState<IndicatorsState>({
    tceaEmisor: 'Valor calculado',
    treaBonista: 'Valor calculado',
    convexidad: 'Valor calculado',
    precioActual: 'Valor calculado',
    duracion: 'Valor calculado',
    utilidadPerdida: 'Valor calculado',
    duracionModificada: 'Valor calculado',
    precioMaximoMercado: 'Valor calculado'
  });

  // Data state
  const [bonds, setBonds] = useState<Bond[]>([]);
  
  // Loading states
  const [bondsLoading, setBondsLoading] = useState(true);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  
  // Error states
  const [bondsError, setBondsError] = useState<string | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  // User session
  const { username, userInitial, isLoaded } = useUserSession();
  const router = useRouter();

  // Load bonds on component mount
  const loadBonds = async () => {
    try {
      setBondsLoading(true);
      setBondsError(null);
      
      const data = await loader();
      
      if (data.error) {
        setBondsError(data.error);
        setBonds([]);
      } else {
        setBonds(data.bonds);
      }
    } catch (err) {
      setBondsError(err instanceof Error ? err.message : 'Error desconocido');
      setBonds([]);
    } finally {
      setBondsLoading(false);
    }
  };

  useEffect(() => {
    loadBonds();
  }, []);

  // Convert bonds to select options
  const bondOptions: SelectOption[] = bonds.map(bond => ({
    value: bond.id.toString(),
    label: `${bond.name} - ${bond.currency} ${bond.interestRate}% ${bond.numberOfYears}Y`
  }));

  // Format numbers for display
  const formatPercentage = (value: number): string => {
    return `${(value * 100).toFixed(4)}%`;
  };

  const formatCurrency = (value: number): string => {
    return `$${value.toFixed(2)}`;
  };

  const formatNumber = (value: number): string => {
    return value.toFixed(4);
  };

  const formatYears = (value: number): string => {
    return `${value.toFixed(2)} años`;
  };

  // Handle financial analysis
  const handleAnalyze = async () => {
    if (!selectedBond) {
      alert('Por favor seleccione un bono para analizar');
      return;
    }

    try {
      setAnalysisLoading(true);
      setAnalysisError(null);
      
      // Reset indicators to loading state
      setIndicators({
        tceaEmisor: 'Calculando...',
        treaBonista: 'Calculando...',
        convexidad: 'Calculando...',
        precioActual: 'Calculando...',
        duracion: 'Calculando...',
        utilidadPerdida: 'Calculando...',
        duracionModificada: 'Calculando...',
        precioMaximoMercado: 'Calculando...'
      });

      console.log(`Analyzing bond ${selectedBond}`);
      
      // Fetch yield data from API
      await calculateInitialCosts(selectedBond);
      await calculateFinalCosts(selectedBond);
      const response = await fetchYield(selectedBond);
      
      let yieldData: YieldData;
      
      // Handle response format
      if (response?.data) {
        yieldData = response.data;
      } else if (response && typeof response === 'object' && 'bondId' in response) {
        yieldData = response as YieldData;
      } else {
        throw new Error('Formato de respuesta inválido');
      }

      console.log('Yield data received:', yieldData);

      // Update indicators with API data
      setIndicators({
        tceaEmisor: formatPercentage(yieldData.tcea),
        treaBonista: formatPercentage(yieldData.trea),
        convexidad: formatNumber(yieldData.convexity),
        precioActual: formatCurrency(yieldData.currentPrice),
        duracion: formatYears(yieldData.macaulayDuration),
        utilidadPerdida: formatCurrency(yieldData.profitOrLoss),
        duracionModificada: formatNumber(yieldData.modifiedDuration),
        precioMaximoMercado: formatCurrency(yieldData.maxMarketPrice)
      });

    } catch (error) {
      console.error('Error analyzing bond:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error al analizar el bono';
      setAnalysisError(errorMessage);
      
      // Reset indicators to error state
      setIndicators({
        tceaEmisor: 'Error',
        treaBonista: 'Error',
        convexidad: 'Error',
        precioActual: 'Error',
        duracion: 'Error',
        utilidadPerdida: 'Error',
        duracionModificada: 'Error',
        precioMaximoMercado: 'Error'
      });
    } finally {
      setAnalysisLoading(false);
    }
  };

  const handleLogout = () => {
    // Clear localStorage on logout (client-side only)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('username');
      localStorage.removeItem('userId');
    }
    router.push('/');
  };

  const handleGoBack = () => {
    const url = `/dashboard`;
    router.push(url);
  };

  const handleClearResults = () => {
    setIndicators({
      tceaEmisor: 'Valor calculado',
      treaBonista: 'Valor calculado',
      convexidad: 'Valor calculado',
      precioActual: 'Valor calculado',
      duracion: 'Valor calculado',
      utilidadPerdida: 'Valor calculado',
      duracionModificada: 'Valor calculado',
      precioMaximoMercado: 'Valor calculado'
    });
    setAnalysisError(null);
  };

  // Get selected bond details for display
  const selectedBondDetails = bonds.find(bond => bond.id.toString() === selectedBond);

  // Show loading state while user session is being loaded
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingState message="Cargando..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userName={username} userInitial={userInitial} onLogout={handleLogout} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between my-16">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              ANÁLISIS FINANCIERO DE BONOS
            </h1>
            {selectedBondDetails && (
              <p className="text-gray-600 mt-2">
                Analizando: {selectedBondDetails.name}
              </p>
            )}
          </div>
          
          <GenericButton
            text="Volver"
            color="gray"
            status="outlined"
            size="md"
            onClick={handleGoBack}
            className="rounded-lg"
          />
        </div>

        {/* Content */}
        {bondsLoading ? (
          <LoadingState message="Cargando bonos..." />
        ) : bondsError ? (
          <ErrorState error={bondsError} onRetry={loadBonds} />
        ) : bonds.length === 0 ? (
          <EmptyBondsState />
        ) : (
          <>
            {/* Bond Selection Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex items-center gap-8">
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-700 mb-4">
                    Selecciona el bono a analizar
                  </h2>
                  <CustomSelect
                    options={bondOptions}
                    value={selectedBond}
                    onChange={setSelectedBond}
                    placeholder="Seleccione un bono"
                  />
                </div>
                <div className="flex-shrink-0 mt-8 flex gap-4">
                  <GenericButton
                    text="Analizar"
                    color="teal"
                    status="filled"
                    size="md"
                    onClick={handleAnalyze}
                    loading={analysisLoading}
                    disabled={analysisLoading || !selectedBond}
                    className="rounded-lg px-8"
                  />
                  
                  {indicators.tceaEmisor !== 'Valor calculado' && (
                    <GenericButton
                      text="Limpiar"
                      color="gray"
                      status="outlined"
                      size="md"
                      onClick={handleClearResults}
                      disabled={analysisLoading}
                      className="rounded-lg px-8"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Analysis Error */}
            {analysisError && (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <ErrorState 
                  error={analysisError} 
                  onRetry={handleAnalyze}
                />
              </div>
            )}

            {/* Indicators Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  INDICADORES DEL BONO
                </h2>
                {selectedBondDetails && (
                  <p className="text-gray-600">
                    Resultados para: {selectedBondDetails.name} - {selectedBondDetails.currency} {selectedBondDetails.interestRate}%
                  </p>
                )}
              </div>
              
              {/* Indicators Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
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
          </>
        )}
      </div>
    </div>
  );
};

export default FinancialAnalysisContent;