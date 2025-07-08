'use client';
import { GenericButton } from "@/app/shared/components/GenericButton";
import { useRouter, useSearchParams } from 'next/navigation';
import { Header } from "../../components/Header";
import fetchAllBonds from "@/api/requests/bond/fetchAll";
import { Bond } from "@/misc/types/Bond";
import { useEffect, useState } from 'react';

// Types
interface LoaderData {
  bonds: Bond[];
  error?: string;
}

// Loader function - Note: This should be used with proper data fetching pattern
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

// Empty state component
const EmptyBondsState = () => (
  <div className="text-center py-16">
    <div className="mb-4">
      <svg 
        className="mx-auto h-12 w-12 text-gray-400" 
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
      No hay bonos guardados
    </h3>
    <p className="text-gray-500">
      Aún no tienes bonos guardados. Crea tu primer bono para comenzar.
    </p>
  </div>
);

// Loading state component
const LoadingState = () => (
  <div className="text-center py-16">
    <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-gray-500 bg-white">
      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Cargando bonos...
    </div>
  </div>
);

// Error state component
const ErrorState = ({ error, onRetry }: { error: string; onRetry: () => void }) => (
  <div className="text-center py-16">
    <div className="mb-4">
      <svg 
        className="mx-auto h-12 w-12 text-red-400" 
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
      Error al cargar los bonos
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

// Bond row component
interface BondRowProps {
  bond: Bond;
  onView: (bondId: number) => void;
  onDelete: (bondId: number) => void;
}

const BondRow = ({ bond, onView, onDelete }: BondRowProps) => {
  const handleDelete = () => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar el bono "${bond.name}"?`)) {
      onDelete(bond.id);
    }
  };

  return (
    <div className="grid grid-cols-12 gap-6 items-center bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      {/* Bond Name */}
      <div className="col-span-6">
        <input
          type="text"
          value={bond.name}
          readOnly
          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 font-medium focus:outline-none cursor-default"
          title={bond.name}
        />
      </div>
      
      {/* Ver Button */}
      <div className="col-span-3">
        <GenericButton
          text="Ver"
          color="teal"
          status="filled"
          size="md"
          fullWidth={true}
          onClick={() => onView(bond.id)}
          className="rounded-lg"
        />
      </div>
      
      {/* Eliminar Button */}
      <div className="col-span-3">
        <GenericButton
          text="Eliminar"
          color="red"
          status="outlined"
          size="md"
          fullWidth={true}
          onClick={handleDelete}
          className="rounded-lg"
        />
      </div>
    </div>
  );
};

// Main component
const MyBondsContent = () => {
  const [bonds, setBonds] = useState<Bond[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const userName = searchParams.get('username') || 'Usuario';
  const userInitial = userName.charAt(0).toUpperCase();

  // Load bonds data
  const loadBonds = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await loader();
      
      if (data.error) {
        setError(data.error);
        setBonds([]);
      } else {
        setBonds(data.bonds);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      setBonds([]);
    } finally {
      setLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    loadBonds();
  }, []);

  const handleLogout = () => {
    console.log('Logging out...');
    router.push('/');
  };

  const handleView = (bondId: number) => {
    console.log(`Ver bono ${bondId}`);
    // Navigate to bond details page
    router.push(`/bonds/${bondId}`);
  };

  const handleDelete = async (bondId: number) => {
    try {
      // Implement delete logic here
      console.log(`Eliminar bono ${bondId}`);
      
      // Optimistically update UI
      setBonds(prevBonds => prevBonds.filter(bond => bond.id !== bondId));
      
    } catch (error) {
      console.error('Error deleting bond:', error);
      // Reload bonds to reset state if delete failed
      loadBonds();
    }
  };

  const handleCreateNew = () => {
    router.push('/bonds/new');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        userName={userName} 
        userInitial={userInitial} 
        onLogout={handleLogout} 
      />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center my-16">
          <h1 className="text-3xl font-bold text-gray-900">
            MIS BONOS GUARDADOS
          </h1>
          
          <GenericButton
            text="Nuevo Bono"
            color="teal"
            status="filled"
            size="md"
            onClick={handleCreateNew}
            className="rounded-lg"
          />
        </div>
        
        {/* Content */}
        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState error={error} onRetry={loadBonds} />
        ) : bonds.length === 0 ? (
          <EmptyBondsState />
        ) : (
          <div className="space-y-6">
            {/* Header Row */}
            <div className="grid grid-cols-12 gap-6 items-center px-4">
              <div className="col-span-6">
                <h2 className="text-lg font-semibold text-gray-700">
                  Nombre del bono
                </h2>
              </div>
              <div className="col-span-3 text-center">
                <h2 className="text-lg font-semibold text-gray-700">
                  Acciones
                </h2>
              </div>
              <div className="col-span-3"></div>
            </div>

            {/* Bond Rows */}
            <div className="space-y-4">
              {bonds.map((bond) => (
                <BondRow
                  key={bond.id}
                  bond={bond}
                  onView={handleView}
                  onDelete={handleDelete}
                />
              ))}
            </div>
            
            {/* Summary */}
            <div className="mt-8 text-center text-gray-500">
              {bonds.length === 1 
                ? `${bonds.length} bono guardado` 
                : `${bonds.length} bonos guardados`
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBondsContent;