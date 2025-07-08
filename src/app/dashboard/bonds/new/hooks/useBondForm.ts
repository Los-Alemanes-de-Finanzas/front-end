'use client';
import { useState, useCallback } from 'react';
import { BondFormData } from '../types/bondTypes';

const initialFormData: BondFormData = {
  bondName: '',
  nominalValue: '',
  commercialValue: '',
  years: '',
  couponFrequency: '',
  daysPerYear: '',
  interestRateType: '',
  capitalization: '',
  interestRate: '',
  discountRate: '',
  issueDate: '',
  currency: '',
  primaPct: '',
  structurationPayer: '',
  placementPayer: '',
  flotationPayer: '',
  cavaliPayer: '',
  structurationPct: '',
  placementPct: '',
  flotationPct: '',
  cavaliPct: '',
};

export const useBondForm = () => {
  const [formData, setFormData] = useState<BondFormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);

  const updateField = useCallback((field: keyof BondFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const validateForm = useCallback((): string[] => {
    const errors: string[] = [];
    
    if (!formData.bondName.trim()) errors.push('Nombre del bono es requerido');
    if (!formData.nominalValue.trim()) errors.push('Valor nominal es requerido');
    if (!formData.commercialValue.trim()) errors.push('Valor comercial es requerido');
    // Add more validations as needed
    
    return errors;
  }, [formData]);

  const handleSubmit = useCallback(async () => {
    const errors = validateForm();
    if (errors.length > 0) {
      alert('Por favor complete los campos requeridos:\n' + errors.join('\n'));
      return;
    }

    setIsLoading(true);
    try {
      // Here you would implement the actual save logic
      console.log('Guardando proyección de bono...', formData);
      // await saveBondProjection(formData);
    } catch (error) {
      console.error('Error saving bond projection:', error);
    } finally {
      setIsLoading(false);
    }
  }, [formData, validateForm]);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
  }, []);

  return {
    formData,
    updateField,
    handleSubmit,
    resetForm,
    isLoading,
    validateForm
  };
};