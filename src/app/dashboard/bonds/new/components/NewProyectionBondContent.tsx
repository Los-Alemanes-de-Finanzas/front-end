'use client';
import React, { useEffect, useState } from 'react';
import { GenericButton } from "@/app/shared/components/GenericButton";
import { useRouter, useSearchParams } from 'next/navigation';
import { useBondForm } from '../hooks/useBondForm';
import { Header } from '../../../components/Header';
import { BondBasicInfo } from './BondBasicInfo';
import { InitialCosts } from './InitialCosts';
import createBond from '@/api/requests/bond/create';
import createIssuanceCost from '@/api/requests/issuanceCost/create';
import { Bond } from '@/misc/types/Bond';
import { IssuanceCost } from '@/misc/types/IssuanceCost';
import fetchBondByName from '@/api/requests/bond/fetchBondByName';

// Success modal component
interface SuccessModalProps {
    isOpen: boolean;
    bondName: string;
    onClose: () => void;
    onViewBond: () => void;
    onCreateAnother: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ 
    isOpen, 
    bondName,
    onClose, 
    onViewBond, 
    onCreateAnother 
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md mx-4 shadow-xl">
                <div className="text-center">
                    {/* Success Icon */}
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                        <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        ¡Bono creado exitosamente!
                    </h3>
                    
                    <p className="text-gray-500 mb-6">
                        El bono <strong>{bondName}</strong> ha sido guardado correctamente.
                    </p>
                    
                    <div className="flex flex-col gap-3">
                        
                        <GenericButton
                            text="Ver Bono"
                            color="teal"
                            status="outlined"
                            size="md"
                            fullWidth={true}
                            onClick={onViewBond}
                            className="rounded-lg"
                        />

                        <GenericButton
                            text="Crear Otro Bono"
                            color="teal"
                            status="outlined"
                            size="md"
                            fullWidth={true}
                            onClick={onCreateAnother}
                            className="rounded-lg"
                        />
                        
                        <GenericButton
                            text="Ir a Mis Bonos"
                            color="gray"
                            status="text"
                            size="md"
                            fullWidth={true}
                            onClick={onClose}
                            className="rounded-lg"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

// Custom hook for bond creation logic
const useBondCreation = (userName: string) => {
    const [isCreating, setIsCreating] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [createdBondId, setCreatedBondId] = useState<number | null>(null);
    const [createdBondName, setCreatedBondName] = useState('');
    const router = useRouter();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const createBondWithCosts = async (formData: any): Promise<boolean> => {
        setIsCreating(true);
        
        try {
            // Step 1: Validate required fields
            const validationErrors = validateFormData(formData);
            if (validationErrors.length > 0) {
                alert('Por favor complete los siguientes campos:\n' + validationErrors.join('\n'));
                return false;
            }

            // Step 2: Get user ID safely
            const userId = getUserIdSafely();

            // Step 3: Prepare bond data
            const [day, month, year] = formData.issueDate.split("/");
            const parsedDate = new Date(Number(year), Number(month) - 1, Number(day));
            const bondData: Bond = {
                id: 0,
                name: formData.bondName,
                userId: userId, 
                nominalValue: parseFloat(formData.nominalValue) || 0,
                commercialValue: parseFloat(formData.commercialValue) || 0,
                numberOfYears: parseInt(formData.years) || 0,
                couponFrequency: formData.couponFrequency,
                daysPerYear: parseInt(formData.daysPerYear) || 360,
                interestRateType: formData.interestRateType,
                capitalization: parseInt(formData.capitalization) || 0,
                interestRate: parseFloat(formData.interestRate) || 0,
                annualDiscountRate: parseFloat(formData.discountRate) || 0,
                issueDate: parsedDate,
                gracePeriodType: 0,
                gracePeriodDuration: 0,
                currency: formData.currency,
                effectiveAnnualRate: 0,
                cokPerPeriod: 0
            };

            console.log('Creating bond with data:', bondData);

            // Step 4: Create the bond
            await createBond(bondData);
            
            const createdBond = await fetchBondByName(formData.bondName);

            // Step 5: Prepare issuance cost data
            const issuanceCostData: IssuanceCost = {
                id: 0,
                bondId: createdBond.id,
                premium: parseFloat(formData.primaPct) || 0,
                structuringCost: parseFloat(formData.structurationPct) || 0,
                whoPaysStructuring: formData.structurationPayer || '',
                placementCost: parseFloat(formData.placementPct) || 0,
                whoPaysPlacement: formData.placementPayer || '',
                flotationCost: parseFloat(formData.flotationPct) || 0,
                whoPaysFloatation: formData.flotationPayer || '',
                cavaliFee: parseFloat(formData.cavaliPct) || 0,
                whoPaysCavali: formData.cavaliPayer || '',
                initialCostIssuer: 0,
                initialCostBondholder: 0
            };

            console.log('Creating issuance cost with data:', issuanceCostData);

            // Step 6: Create the issuance cost
            const createdIssuanceCost = await createIssuanceCost(issuanceCostData);
            
            console.log('Issuance cost created successfully:', createdIssuanceCost);

            // Step 7: Show success
            setCreatedBondId(createdBond.id);
            setCreatedBondName(createdBond.name || formData.bondName);
            setShowSuccessModal(true);

            return true;

        } catch (error) {
            console.error('Error creating bond:', error);
            
            // Show user-friendly error message
            const errorMessage = error instanceof Error 
                ? error.message 
                : 'Error desconocido al crear el bono';
            
            alert(`Error al crear el bono: ${errorMessage}`);
            return false;
            
        } finally {
            setIsCreating(false);
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const validateFormData = (data: any): string[] => {
        const errors: string[] = [];
        
        if (!data.bondName?.trim()) errors.push('- Nombre del bono');
        if (!data.nominalValue?.trim()) errors.push('- Valor nominal');
        if (!data.commercialValue?.trim()) errors.push('- Valor comercial');
        if (!data.years?.trim()) errors.push('- Número de años');
        if (!data.couponFrequency) errors.push('- Frecuencia de cupón');
        if (!data.daysPerYear) errors.push('- Días por año');
        if (!data.interestRateType) errors.push('- Tipo de tasa de interés');
        if (!data.interestRate?.trim()) errors.push('- Tasa de interés');
        if (!data.discountRate?.trim()) errors.push('- Tasa de descuento');
        if (!data.issueDate?.trim()) errors.push('- Fecha de emisión');
        if (!data.currency) errors.push('- Moneda');
        
        return errors;
    };

    const getUserIdSafely = (): number => {
        // Check if we're in the browser environment
        if (typeof window !== 'undefined') {
            const storedUserId = localStorage.getItem('userId');
            if (storedUserId && !isNaN(Number(storedUserId))) {
                return Number(storedUserId);
            }
        }
        // Default fallback
        return 1;
    };

    const handleSuccessModalClose = () => {
        setShowSuccessModal(false);
        const url = userName ? `/dashboard/bonds` : '/dashboard/bonds';
        router.push(url);
    };

    const handleViewBond = () => {
        if (createdBondId) {
            const url = userName 
                ? `/dashboard/bonds/${createdBondId}` 
                : `/dashboard/bonds/${createdBondId}`;
            router.push(url);
        }
    };

    const handleCreateAnother = () => {
        setShowSuccessModal(false);
        // Reset form or reload page
        window.location.reload();
    };

    return {
        isCreating,
        showSuccessModal,
        createdBondName,
        createBondWithCosts,
        handleSuccessModalClose,
        handleViewBond,
        handleCreateAnother
    };
};

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

export const NewProyectionBondContent: React.FC = () => {
    const { formData, updateField } = useBondForm();
    const { username, userInitial, isLoaded } = useUserSession();
    const router = useRouter();

    const {
        isCreating,
        showSuccessModal,
        createdBondName,
        createBondWithCosts,
        handleSuccessModalClose,
        handleViewBond,
        handleCreateAnother
    } = useBondCreation(username);

    const handleLogout = () => {
        // Clear localStorage on logout (client-side only)
        if (typeof window !== 'undefined') {
            localStorage.removeItem('username');
            localStorage.removeItem('userId');
        }
        router.push('/');
    };

    const handleSubmit = async () => {
        const success = await createBondWithCosts(formData);
        if (success) {
            console.log('Bond and issuance cost created successfully');
        }
    };

    const handleGoBack = () => {
        const url = username ? `/dashboard/bonds` : '/dashboard/bonds';
        router.push(url);
    };

    // Show loading state while user session is being loaded
    if (!isLoaded) {
        return (
            <div className="bg-gray-100 min-h-screen flex items-center justify-center">
                <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-gray-500 bg-white">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Cargando...
                </div>
            </div>
        );
    }
    
    return (
        <div className="bg-gray-100 min-h-screen">
            <Header userName={username} userInitial={userInitial} onLogout={handleLogout} />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between my-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            NUEVA PROYECCIÓN DE BONO
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Completa los siguientes campos:
                        </p>
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
                        disabled={isCreating}
                        className="rounded-lg px-12"
                    />
                    <GenericButton
                        text="Guardar"
                        color="teal"
                        status="filled"
                        size="lg"
                        onClick={handleSubmit}
                        loading={isCreating}
                        className="rounded-lg px-12"
                    />
                </div>
            </div>

            {/* Success Modal */}
            <SuccessModal
                isOpen={showSuccessModal}
                bondName={createdBondName}
                onClose={handleSuccessModalClose}
                onViewBond={handleViewBond}
                onCreateAnother={handleCreateAnother}
            />
        </div>
    );
};