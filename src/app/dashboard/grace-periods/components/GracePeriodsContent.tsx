'use client';
import { useState, useEffect } from "react";
import { GenericButton } from "@/app/shared/components/GenericButton";
import { useRouter } from "next/navigation";
import { Header } from "../../components/Header";
import { CustomSelect, SelectOption } from "@/app/shared/components/CustomSelect";
import fetchAllBonds from "@/api/requests/bond/fetchAll";
import fetchPaymentSchedule from "@/api/requests/bond/fetchPaymentSchedule";
import { Bond } from "@/misc/types/Bond";

// Types for API response
interface PaymentScheduleItem {
  period: number;
  paymentDate: string;
  interest: number;
  amortization: number;
  cuota: number;
  saldo: number;
}

interface LoaderData {
  bonds: Bond[];
  error?: string;
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
      Primero debes crear un bono para poder aplicar plazos de gracia.
    </p>
  </div>
);

const GracePeriodsContent: React.FC = () => {
  // Form state
  const [selectedBond, setSelectedBond] = useState('');
  const [gracePeriodType, setGracePeriodType] = useState('');
  const [gracePeriodDuration, setGracePeriodDuration] = useState('');
  
  // Data state
  const [bonds, setBonds] = useState<Bond[]>([]);
  const [schedule, setSchedule] = useState<PaymentScheduleItem[]>([]);
  
  // Loading states
  const [bondsLoading, setBondsLoading] = useState(true);
  const [scheduleLoading, setScheduleLoading] = useState(false);
  
  // Error states
  const [bondsError, setBondsError] = useState<string | null>(null);
  const [scheduleError, setScheduleError] = useState<string | null>(null);

  const [username, setUsername] = useState('');
  const router = useRouter();
  const userInitial = username.charAt(0).toUpperCase();

  // Grace period options
  const gracePeriodOptions: SelectOption[] = [
    { value: 'total', label: 'Plazo de gracia total' },
    { value: 'parcial', label: 'Plazo de gracia parcial' },
    { value: 'ninguno', label: 'Sin plazo de gracia' }
  ];

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
    const savedUsername = localStorage.getItem('username');
  
    if (savedUsername) setUsername(savedUsername);
    loadBonds();
  }, []);

  // Convert bonds to select options
  const bondOptions: SelectOption[] = bonds.map(bond => ({
    value: bond.id.toString(),
    label: `${bond.name} - ${bond.currency} ${bond.interestRate}%`
  }));

  // Handle applying grace periods
  const handleApply = async () => {
    // Validation
    if (!selectedBond) {
      alert('Por favor seleccione un bono');
      return;
    }
    
    if (!gracePeriodType) {
      alert('Por favor seleccione el tipo de plazo de gracia');
      return;
    }
    
    if (!gracePeriodDuration || isNaN(Number(gracePeriodDuration))) {
      alert('Por favor ingrese una duración válida para el plazo de gracia');
      return;
    }

    try {
      setScheduleLoading(true);
      setScheduleError(null);
      setSchedule([]); // Clear previous results
      
      console.log(`Fetching payment schedule for bond ${selectedBond}`);
      
      // Fetch payment schedule from API
      const response = await fetchPaymentSchedule(selectedBond);
      
      // Handle response
      if (response && Array.isArray(response)) {
        setSchedule(response);
        console.log('Payment schedule loaded successfully:', response);
      } else if (response?.data && Array.isArray(response.data)) {
        setSchedule(response.data);
        console.log('Payment schedule loaded successfully:', response.data);
      } else {
        throw new Error('Formato de respuesta inválido');
      }
      
    } catch (error) {
      console.error('Error fetching payment schedule:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error al obtener el cronograma de pagos';
      setScheduleError(errorMessage);
      setSchedule([]);
    } finally {
      setScheduleLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return amount.toFixed(2);
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES');
    } catch {
      return dateString;
    }
  };

  const handleLogout = () => {
    router.push('/');
  };

  const handleGoBack = () => {
    router.push(`/dashboard?username=${username}`);
  };

  // Get selected bond details for display
  const selectedBondDetails = bonds.find(bond => bond.id.toString() === selectedBond);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header userName={username} userInitial={userInitial} onLogout={handleLogout} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between my-12">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              PLAZOS DE GRACIA
            </h1>
            {selectedBondDetails && (
              <p className="text-gray-600 mt-2">
                Aplicando a: {selectedBondDetails.name}
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
            {/* Form Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Bond Selection */}
                <div className="space-y-3">
                  <label className="text-lg font-semibold text-gray-700">
                    Selecciona el bono
                  </label>
                  <CustomSelect
                    options={bondOptions}
                    value={selectedBond}
                    onChange={setSelectedBond}
                    placeholder="Seleccione un bono"
                  />
                </div>

                {/* Grace Period Type */}
                <div className="space-y-3">
                  <label className="text-lg font-semibold text-gray-700">
                    Tipo de plazo de gracia
                  </label>
                  <CustomSelect
                    options={gracePeriodOptions}
                    value={gracePeriodType}
                    onChange={setGracePeriodType}
                    placeholder="Seleccione el tipo"
                  />
                </div>
              </div>

              {/* Grace Period Duration */}
              <div className="mb-6">
                <label className="text-lg font-semibold text-gray-700 mb-3 block">
                  Duración del plazo de gracia (periodos)
                </label>
                <input
                  type="number"
                  min="0"
                  value={gracePeriodDuration}
                  onChange={(e) => setGracePeriodDuration(e.target.value)}
                  placeholder="Ingrese un valor"
                  className="w-full max-w-sm px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>

              {/* Apply Button */}
              <div className="flex gap-4">
                <GenericButton
                  text="Aplicar"
                  color="teal"
                  status="filled"
                  size="md"
                  onClick={handleApply}
                  loading={scheduleLoading}
                  disabled={scheduleLoading || !selectedBond}
                  className="rounded-lg px-8"
                />
                
                {schedule.length > 0 && (
                  <GenericButton
                    text="Limpiar Resultados"
                    color="gray"
                    status="outlined"
                    size="md"
                    onClick={() => {
                      setSchedule([]);
                      setScheduleError(null);
                    }}
                    className="rounded-lg px-8"
                  />
                )}
              </div>
            </div>

            {/* Loading state for schedule */}
            {scheduleLoading && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <LoadingState message="Calculando cronograma de pagos..." />
              </div>
            )}

            {/* Error state for schedule */}
            {scheduleError && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <ErrorState 
                  error={scheduleError} 
                  onRetry={handleApply}
                />
              </div>
            )}

            {/* Schedule Table */}
            {schedule.length > 0 && !scheduleLoading && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900">
                    NUEVO CRONOGRAMA
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Cronograma de pagos para {selectedBondDetails?.name}
                  </p>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-teal-500 text-white">
                        <th className="px-6 py-4 text-center font-semibold">PERIODO</th>
                        <th className="px-6 py-4 text-center font-semibold">FECHA</th>
                        <th className="px-6 py-4 text-center font-semibold">CUOTA</th>
                        <th className="px-6 py-4 text-center font-semibold">AMORT.</th>
                        <th className="px-6 py-4 text-center font-semibold">INTERÉS</th>
                        <th className="px-6 py-4 text-center font-semibold">SALDO</th>
                      </tr>
                    </thead>
                    <tbody>
                      {schedule.map((row, index) => (
                        <tr key={row.period} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-6 py-4 text-center text-gray-900 font-medium">{row.period}</td>
                          <td className="px-6 py-4 text-center text-gray-900">{formatDate(row.paymentDate)}</td>
                          <td className="px-6 py-4 text-center text-gray-900">{formatCurrency(row.cuota)}</td>
                          <td className="px-6 py-4 text-center text-gray-900">{formatCurrency(row.amortization)}</td>
                          <td className="px-6 py-4 text-center text-gray-900">{formatCurrency(row.interest)}</td>
                          <td className="px-6 py-4 text-center text-gray-900">{formatCurrency(row.saldo)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Summary */}
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>Total de periodos: {schedule.length}</span>
                    <span>
                      Total cuotas: {formatCurrency(schedule.reduce((sum, row) => sum + row.cuota, 0))}
                    </span>
                  </div>
                </div>
                
                {/* Three dots indicator */}
                <div className="flex justify-center py-4">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default GracePeriodsContent;