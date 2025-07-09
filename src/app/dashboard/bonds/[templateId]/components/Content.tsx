'use client';
import React, { useEffect, useState } from 'react';
import { GenericButton } from "@/app/shared/components/GenericButton";
import { useRouter, useParams } from 'next/navigation';
import { Header } from '../../../components/Header';
import { useBondForm } from '../../new/hooks/useBondForm';
import { BondBasicInfo } from '../../new/components/BondBasicInfo';
import { InitialCosts } from '../../new/components/InitialCosts';
import { Bond } from '@/misc/types/Bond';
import fetchBondById from '@/api/requests/bond/fetchById';
import { IssuanceCost } from '@/misc/types/IssuanceCost';
import fetchIssuanceCostByBondId from '@/api/requests/issuanceCost/fetchByBondId';


interface LoaderData {
    bond: Bond | null;
    issuanceCost: IssuanceCost | null;
    error?: string;
}

// Loader function
export const loader = async (id: string): Promise<LoaderData> => {
    try {
        if (!id || isNaN(Number(id))) {
            return {
                bond: null,
                issuanceCost: null,
                error: 'ID de bono inválido'
            };
        }

        const bondId = Number(id);
        
        // Fetch both bond and issuance cost data in parallel
        const [bond, issuanceCost] = await Promise.all([
            fetchBondById(bondId.toString()),
            fetchIssuanceCostByBondId(bondId.toString())
        ]);

        return { 
            bond: bond || null, 
            issuanceCost: issuanceCost || null 
        };
    } catch (error) {
        console.error("Error fetching bond data", error);
        return {
            bond: null,
            issuanceCost: null,
            error: error instanceof Error ? error.message : 'Error al cargar los datos del bono'
        };
    }
};

// Loading component
const LoadingState = () => (
    <div className="flex justify-center items-center py-32">
        <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-gray-500 bg-white">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Cargando información del bono...
        </div>
    </div>
);

// Error component
const ErrorState = ({ 
    error, 
    onRetry, 
    onGoBack 
}: { 
    error: string; 
    onRetry: () => void; 
    onGoBack: () => void; 
}) => (
    <div className="flex flex-col items-center justify-center py-32">
        <div className="text-center">
            <svg 
                className="mx-auto h-12 w-12 text-red-400 mb-4" 
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
            <h3 className="text-lg font-medium text-gray-900 mb-2">
                Error al cargar el bono
            </h3>
            <p className="text-gray-500 mb-6">
                {error}
            </p>
            <div className="flex gap-4 justify-center">
                <GenericButton
                    text="Reintentar"
                    color="teal"
                    status="filled"
                    size="md"
                    onClick={onRetry}
                    className="rounded-lg"
                />
                <GenericButton
                    text="Volver a Mis Bonos"
                    color="gray"
                    status="outlined"
                    size="md"
                    onClick={onGoBack}
                    className="rounded-lg"
                />
            </div>
        </div>
    </div>
);

// Bond not found component
const BondNotFoundState = ({ onGoBack }: { onGoBack: () => void }) => (
    <div className="flex flex-col items-center justify-center py-32">
        <div className="text-center">
            <svg 
                className="mx-auto h-12 w-12 text-gray-400 mb-4" 
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
            <h3 className="text-lg font-medium text-gray-900 mb-2">
                Bono no encontrado
            </h3>
            <p className="text-gray-500 mb-6">
                El bono que buscas no existe o ha sido eliminado.
            </p>
            <GenericButton
                text="Volver a Mis Bonos"
                color="teal"
                status="filled"
                size="md"
                onClick={onGoBack}
                className="rounded-lg"
            />
        </div>
    </div>
);

// Enhanced bond form hook that accepts initial data
const useBondFormWithData = (bond?: Bond | null, issuanceCost?: IssuanceCost | null) => {
    const bondForm = useBondForm();
    const [isInitialized, setIsInitialized] = useState(false);

    // Populate form with bond data when available
    useEffect(() => {
        if (bond && !isInitialized) {
            // Map Bond properties to form fields (corrected field names)
            bondForm.updateField('bondName', bond.name || '');
            bondForm.updateField('nominalValue', bond.nominalValue?.toString() || '');
            bondForm.updateField('commercialValue', bond.commercialValue?.toString() || '');
            bondForm.updateField('years', bond.numberOfYears?.toString() || ''); // numberOfYears -> years
            bondForm.updateField('couponFrequency', bond.couponFrequency || '');
            bondForm.updateField('daysPerYear', bond.daysPerYear?.toString() || '');
            bondForm.updateField('interestRateType', bond.interestRateType || '');
            bondForm.updateField('capitalization', bond.capitalization?.toString() || ''); // This might need mapping
            bondForm.updateField('interestRate', bond.interestRate?.toString() || '');
            bondForm.updateField('discountRate', bond.annualDiscountRate?.toString() || ''); // annualDiscountRate -> discountRate
            bondForm.updateField('issueDate', bond.issueDate.toString() || '');
            bondForm.updateField('currency', bond.currency || '');
            
            // Map IssuanceCost properties to form fields if available
            if (issuanceCost) {
                bondForm.updateField('primaPct', issuanceCost.premium?.toString() || ''); // premium -> primaPct
                bondForm.updateField('structurationPayer', issuanceCost.whoPaysStructuring || '');
                bondForm.updateField('placementPayer', issuanceCost.whoPaysPlacement || '');
                bondForm.updateField('flotationPayer', issuanceCost.whoPaysFloatation || ''); // whoPaysFloatation -> flotationPayer
                bondForm.updateField('cavaliPayer', issuanceCost.whoPaysCavali || '');
                bondForm.updateField('structurationPct', issuanceCost.structuringCost?.toString() || ''); // structuringCost -> structurationPct
                bondForm.updateField('placementPct', issuanceCost.placementCost?.toString() || '');
                bondForm.updateField('flotationPct', issuanceCost.flotationCost?.toString() || '');
                bondForm.updateField('cavaliPct', issuanceCost.cavaliFee?.toString() || ''); // cavaliFee -> cavaliPct
            }
            
            setIsInitialized(true);
        }
    }, [bond, issuanceCost, isInitialized, bondForm]);

    return bondForm;
};

// Main component
export const SpecificBondContent: React.FC = () => {
    const [bond, setBond] = useState<Bond | null>(null);
    const [issuanceCost, setIssuanceCost] = useState<IssuanceCost | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [username, setUsername] = useState('');
    const [userInitial, setUserInitial] = useState('');

    const router = useRouter();
    const params = useParams();
    
    // Get bond ID from URL params
    const bondId = params?.templateId as string;

    // Initialize form with loaded bond data
    const { formData, updateField, handleSubmit, isLoading: isSaving } = useBondFormWithData(bond, issuanceCost);

    // Load bond data
    const loadBond = async () => {
        if (!bondId) {
            setError('ID de bono no proporcionado');
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const data = await loader(bondId);
            
            if (data.error) {
                setError(data.error);
                setBond(null);
                setIssuanceCost(null);
            } else {
                setBond(data.bond);
                setIssuanceCost(data.issuanceCost);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error desconocido');
            setBond(null);
            setIssuanceCost(null);
        } finally {
            setLoading(false);
        }
    };

    // Load data on component mount
    useEffect(() => {
        const savedUsername = localStorage.getItem('username');
    
        if (savedUsername){ 
            setUsername(savedUsername);
            setUserInitial(savedUsername.charAt(0).toUpperCase());
        }
        loadBond();
    }, [bondId]);

    const handleLogout = () => {
        router.push('/');
    };

    const handleGoBack = () => {
        router.push(`/dashboard/bonds`);
    };

    const handleSaveChanges = async () => {
        try {
            // Call the form's submit handler with the bond ID for updating
            await handleSubmit();
            
            // Show success message or redirect
            alert('Bono actualizado exitosamente');
            
            // Optionally redirect back to bond list
            // router.push(`/bonds?username=${userName}`);
        } catch (error) {
            console.error('Error updating bond:', error);
            alert('Error al actualizar el bono');
        }
    };

    // Show loading state
    if (loading) {
        return (
            <div className="bg-gray-100 min-h-screen">
                <Header userName={username} userInitial={userInitial} onLogout={handleLogout} />
                <LoadingState />
            </div>
        );
    }

    // Show error state
    if (error) {
        return (
            <div className="bg-gray-100 min-h-screen">
                <Header userName={username} userInitial={userInitial} onLogout={handleLogout} />
                <ErrorState 
                    error={error} 
                    onRetry={loadBond} 
                    onGoBack={handleGoBack}
                />
            </div>
        );
    }

    // Show not found state
    if (!bond) {
        return (
            <div className="bg-gray-100 min-h-screen">
                <Header userName={username} userInitial={userInitial} onLogout={handleLogout} />
                <BondNotFoundState onGoBack={handleGoBack} />
            </div>
        );
    }

    // Show main content
    return (
        <div className="bg-gray-100 min-h-screen">
            <Header userName={username} userInitial={userInitial} onLogout={handleLogout} />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between my-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            EDITAR BONO
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Editando: {bond.name}
                        </p>
                        {/* Show if issuance cost data is available */}
                        {issuanceCost ? (
                            <p className="text-sm text-green-600 mt-1">
                                ✓ Datos de costos de emisión cargados
                            </p>
                        ) : (
                            <p className="text-sm text-yellow-600 mt-1">
                                ⚠ No se encontraron datos de costos de emisión
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
                
                <p className="text-gray-600 mb-12">
                    Modifica los campos que necesites actualizar:
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

                {/* Action Buttons */}
                <div className="flex justify-center gap-4 pt-8 pb-16">
                    <GenericButton
                        text="Cancelar"
                        color="gray"
                        status="outlined"
                        size="lg"
                        onClick={handleGoBack}
                        className="rounded-lg px-12"
                    />
                    <GenericButton
                        text="Guardar Cambios"
                        color="teal"
                        status="filled"
                        size="lg"
                        onClick={handleSaveChanges}
                        loading={isSaving}
                        className="rounded-lg px-12"
                    />
                </div>
            </div>
        </div>
    );
};