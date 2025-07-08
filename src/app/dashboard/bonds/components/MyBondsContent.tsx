'use client';
import { GenericButton } from "@/app/shared/components/GenericButton";
import { useRouter, useSearchParams } from 'next/navigation';
import { Header } from "../../components/Header";
import fetchAllBonds from "@/api/requests/bond/fetchAll";
import { Bond } from "@/misc/types/Bond";
import { useEffect, useState } from 'react';
import deleteBond from "@/api/requests/bond/delete";
import fetchIssuanceCostByBondId from "@/api/requests/issuanceCost/fetchByBondId";
import deleteIssuanceCost from "@/api/requests/issuanceCost/delete";

// Types
interface LoaderData {
  bonds: Bond[];
  error?: string;
}

// Loader function
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

// Delete confirmation modal component
interface DeleteConfirmationModalProps {
  isOpen: boolean;
  bondName: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  bondName,
  onConfirm,
  onCancel,
  isDeleting
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md mx-4 shadow-xl">
        <div className="text-center">
          {/* Warning Icon */}
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.958-.833-2.728 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            ¿Eliminar bono?
          </h3>
          
          <p className="text-gray-500 mb-6">
            ¿Estás seguro de que quieres eliminar el bono <strong>"{bondName}"</strong>? 
            Esta acción no se puede deshacer.
          </p>
          
          <div className="flex gap-3 justify-center">
            <GenericButton
              text="Cancelar"
              color="gray"
              status="outlined"
              size="md"
              onClick={onCancel}
              disabled={isDeleting}
              className="rounded-lg px-6"
            />
            
            <GenericButton
              text={isDeleting ? "Eliminando..." : "Eliminar"}
              color="red"
              status="filled"
              size="md"
              onClick={onConfirm}
              loading={isDeleting}
              disabled={isDeleting}
              className="rounded-lg px-6"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Success notification component
interface SuccessNotificationProps {
  isVisible: boolean;
  message: string;
  onClose: () => void;
}

const SuccessNotification: React.FC<SuccessNotificationProps> = ({
  isVisible,
  message,
  onClose
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 transform transition-all duration-300 ease-in-out">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 shadow-lg max-w-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-green-800">
              {message}
            </p>
          </div>
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                className="inline-flex bg-green-50 rounded-md p-1.5 text-green-500 hover:bg-green-100 focus:outline-none"
                onClick={onClose}
              >
                <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Empty state component
const EmptyBondsState = ({ onCreateNew }: { onCreateNew: () => void }) => (
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
    <p className="text-gray-500 mb-6">
      Aún no tienes bonos guardados. Crea tu primer bono para comenzar.
    </p>
    <GenericButton
      text="Crear Primer Bono"
      color="teal"
      status="filled"
      size="md"
      onClick={onCreateNew}
      className="rounded-lg"
    />
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
  onDelete: (bondId: number, bondName: string) => void;
  isDeleting: boolean;
  deletingBondId: number | null;
}

const BondRow = ({ bond, onView, onDelete, isDeleting, deletingBondId }: BondRowProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userName = searchParams.get('username');

  const handleDelete = () => {
    onDelete(bond.id, bond.name);
  };

  const handleView = () => {
    const url = userName 
      ? `/dashboard/bonds/${bond.id}?username=${userName}`
      : `/dashboard/bonds/${bond.id}`;
    router.push(url);
  };

  const isCurrentBondDeleting = isDeleting && deletingBondId === bond.id;

  return (
    <div className={`grid grid-cols-12 gap-6 items-center bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all ${isCurrentBondDeleting ? 'opacity-50' : ''}`}>
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
          onClick={handleView}
          disabled={isCurrentBondDeleting}
          className="rounded-lg"
        />
      </div>
      
      {/* Eliminar Button */}
      <div className="col-span-3">
        <GenericButton
          text={isCurrentBondDeleting ? "Eliminando..." : "Eliminar"}
          color="red"
          status="outlined"
          size="md"
          fullWidth={true}
          onClick={handleDelete}
          loading={isCurrentBondDeleting}
          disabled={isDeleting}
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
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingBondId, setDeletingBondId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bondToDelete, setBondToDelete] = useState<{ id: number; name: string } | null>(null);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

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
    const url = `/dashboard/bonds/${bondId}?username=${userName}`;
    router.push(url);
  };

  const handleDeleteRequest = (bondId: number, bondName: string) => {
    setBondToDelete({ id: bondId, name: bondName });
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!bondToDelete) return;

    try {
      setIsDeleting(true);
      setDeletingBondId(bondToDelete.id);
      
      console.log(`Eliminando bono ${bondToDelete.id}`);
      
      // Call delete API
      const issuanceCostReferenceByBond = await fetchIssuanceCostByBondId(bondToDelete.id.toString());
      await deleteIssuanceCost(issuanceCostReferenceByBond.id.toString());
      await deleteBond(bondToDelete.id.toString());
      
      // Remove bond from local state for immediate UI update
      setBonds(prevBonds => prevBonds.filter(bond => bond.id !== bondToDelete.id));
      
      // Show success notification
      setSuccessMessage(`Bono "${bondToDelete.name}" eliminado exitosamente`);
      setShowSuccessNotification(true);
      
      // Close modal
      setShowDeleteModal(false);
      setBondToDelete(null);
      
    } catch (error) {
      console.error('Error deleting bond:', error);
      
      // Show error and reload bonds to reset state
      const errorMessage = error instanceof Error ? error.message : 'Error al eliminar el bono';
      setError(errorMessage);
      
      // Reload bonds to ensure consistency
      await loadBonds();
      
    } finally {
      setIsDeleting(false);
      setDeletingBondId(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setBondToDelete(null);
  };

  const handleCreateNew = () => {
    router.push(`/dashboard/bonds/new?username=${userName}`);
  };

  const handleCloseSuccessNotification = () => {
    setShowSuccessNotification(false);
    setSuccessMessage('');
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
          <EmptyBondsState onCreateNew={handleCreateNew} />
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
                  onDelete={handleDeleteRequest}
                  isDeleting={isDeleting}
                  deletingBondId={deletingBondId}
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

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        bondName={bondToDelete?.name || ''}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        isDeleting={isDeleting}
      />

      {/* Success Notification */}
      <SuccessNotification
        isVisible={showSuccessNotification}
        message={successMessage}
        onClose={handleCloseSuccessNotification}
      />
    </div>
  );
};

export default MyBondsContent;