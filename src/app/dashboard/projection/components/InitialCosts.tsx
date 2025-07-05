import React from 'react';
import { CustomSelect } from "@/app/shared/components/CustomSelect";
import { TextInput } from './TextInput';
import { BondFormData } from '../types/bondTypes';
import { PAYER_OPTIONS } from '../constants/bondOptions';
import { FormField } from './FormField';

interface InitialCostsProps {
  formData: Pick<BondFormData,
    'primaPct' | 'structurationPayer' | 'placementPayer' | 
    'flotationPayer' | 'cavaliPayer' | 'structurationPct' | 
    'placementPct' | 'flotationPct' | 'cavaliPct'
  >;
  updateField: (field: keyof BondFormData, value: string) => void;
}

export const InitialCosts: React.FC<InitialCostsProps> = ({
  formData,
  updateField
}) => {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">
        Costes iniciales
      </h2>

      {/* First row: Prima, Structuration Payer, Placement Payer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormField label="% Prima">
          <TextInput
            value={formData.primaPct}
            onChange={(value) => updateField('primaPct', value)}
          />
        </FormField>
        
        <FormField label="Quien paga estructuración?">
          <CustomSelect
            options={PAYER_OPTIONS}
            value={formData.structurationPayer}
            onChange={(value) => updateField('structurationPayer', value)}
            placeholder="Option"
          />
        </FormField>
        
        <FormField label="Quien paga la colocación?">
          <CustomSelect
            options={PAYER_OPTIONS}
            value={formData.placementPayer}
            onChange={(value) => updateField('placementPayer', value)}
            placeholder="Option"
          />
        </FormField>
      </div>

      {/* Second row: Flotation Payer, CAVALI Payer, Structuration % */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormField label="Quien paga flotación?">
          <CustomSelect
            options={PAYER_OPTIONS}
            value={formData.flotationPayer}
            onChange={(value) => updateField('flotationPayer', value)}
            placeholder="Option"
          />
        </FormField>
        
        <FormField label="Quien paga CAVALI?">
          <CustomSelect
            options={PAYER_OPTIONS}
            value={formData.cavaliPayer}
            onChange={(value) => updateField('cavaliPayer', value)}
            placeholder="Option"
          />
        </FormField>
        
        <FormField label="% Estructuración">
          <TextInput
            value={formData.structurationPct}
            onChange={(value) => updateField('structurationPct', value)}
          />
        </FormField>
      </div>

      {/* Third row: Placement %, Flotation %, CAVALI % */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormField label="% Colocación">
          <TextInput
            value={formData.placementPct}
            onChange={(value) => updateField('placementPct', value)}
          />
        </FormField>
        
        <FormField label="% Flotación">
          <TextInput
            value={formData.flotationPct}
            onChange={(value) => updateField('flotationPct', value)}
          />
        </FormField>
        
        <FormField label="% CAVALI">
          <TextInput
            value={formData.cavaliPct}
            onChange={(value) => updateField('cavaliPct', value)}
          />
        </FormField>
      </div>
    </div>
  );
};
