import React from 'react';
import { CustomSelect } from "@/app/shared/components/CustomSelect";
import { DateInput } from "@/app/shared/components/DateInput";
import { TextInput } from './TextInput';
import { BondFormData } from '../types/bondTypes';
import {
  FREQUENCY_OPTIONS,
  DAYS_OPTIONS,
  INTEREST_TYPE_OPTIONS,
  CAPITALIZATION_OPTIONS,
  CURRENCY_OPTIONS
} from '../constants/bondOptions';
import { FormField } from './FormField';

interface BondBasicInfoProps {
  formData: Pick<BondFormData, 
    'bondName' | 'nominalValue' | 'commercialValue' | 'years' | 
    'couponFrequency' | 'daysPerYear' | 'interestRateType' | 
    'capitalization' | 'interestRate' | 'discountRate' | 
    'issueDate' | 'currency'
  >;
  updateField: (field: keyof BondFormData, value: string) => void;
}

export const BondBasicInfo: React.FC<BondBasicInfoProps> = ({
  formData,
  updateField
}) => {
  return (
    <div className="space-y-8">
      {/* Bond Name */}
      <FormField label="Nombre del bono">
        <TextInput
          value={formData.bondName}
          onChange={(value) => updateField('bondName', value)}
        />
      </FormField>

      {/* First row: Nominal Value, Commercial Value, Years */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormField label="Valor nominal del bono ( S/ )">
          <TextInput
            value={formData.nominalValue}
            onChange={(value) => updateField('nominalValue', value)}
          />
        </FormField>
        
        <FormField label="Valor comercial ( S/ )">
          <TextInput
            value={formData.commercialValue}
            onChange={(value) => updateField('commercialValue', value)}
          />
        </FormField>
        
        <FormField label="N° Años">
          <TextInput
            value={formData.years}
            onChange={(value) => updateField('years', value)}
          />
        </FormField>
      </div>

      {/* Second row: Frequency, Days, Interest Type */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormField label="Frecuencia cupón">
          <CustomSelect
            options={FREQUENCY_OPTIONS}
            value={formData.couponFrequency}
            onChange={(value) => updateField('couponFrequency', value)}
            placeholder="Option"
          />
        </FormField>
        
        <FormField label="Días por año">
          <CustomSelect
            options={DAYS_OPTIONS}
            value={formData.daysPerYear}
            onChange={(value) => updateField('daysPerYear', value)}
            placeholder="Option"
          />
        </FormField>
        
        <FormField label="Tipo de tasa interés">
          <CustomSelect
            options={INTEREST_TYPE_OPTIONS}
            value={formData.interestRateType}
            onChange={(value) => updateField('interestRateType', value)}
            placeholder="Option"
          />
        </FormField>
      </div>

      {/* Third row: Capitalization, Interest Rate, Discount Rate */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormField label="Capitalización">
          <CustomSelect
            options={CAPITALIZATION_OPTIONS}
            value={formData.capitalization}
            onChange={(value) => updateField('capitalization', value)}
            placeholder="Option"
          />
        </FormField>
        
        <FormField label="Tasa de interés ( % )">
          <TextInput
            value={formData.interestRate}
            onChange={(value) => updateField('interestRate', value)}
          />
        </FormField>
        
        <FormField label="Tasa anual de descuento ( % )">
          <TextInput
            value={formData.discountRate}
            onChange={(value) => updateField('discountRate', value)}
          />
        </FormField>
      </div>

      {/* Fourth row: Issue Date, Currency */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Fecha emisión">
          <DateInput
            value={formData.issueDate}
            onChange={(value) => updateField('issueDate', value)}
            placeholder="DD/MM/YYYY"
          />
        </FormField>
        
        <FormField label="Moneda">
          <CustomSelect
            options={CURRENCY_OPTIONS}
            value={formData.currency}
            onChange={(value) => updateField('currency', value)}
            placeholder="Option"
          />
        </FormField>
      </div>
    </div>
  );
};