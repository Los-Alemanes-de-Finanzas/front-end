import { SelectOption } from "@/app/shared/components/CustomSelect";

export const FREQUENCY_OPTIONS: SelectOption[] = [
  { value: 'mensual', label: 'Mensual' },
  { value: 'bimestral', label: 'Bimestral'},
  { value: 'trimestral', label: 'Trimestral' },
  { value: 'cuatrimestral', label: 'Cuatrimestral'},
  { value: 'semestral', label: 'Semestral' },
  { value: 'anual', label: 'Anual' }
];

export const DAYS_OPTIONS: SelectOption[] = [
  { value: '360', label: '360 días' },
  { value: '365', label: '365 días' }
];

export const INTEREST_TYPE_OPTIONS: SelectOption[] = [
  { value: 'simple', label: 'Interés simple' },
  { value: 'compound', label: 'Interés compuesto' }
];

export const CAPITALIZATION_OPTIONS: SelectOption[] = [
  { value: 'monthly', label: 'Mensual' },
  { value: 'quarterly', label: 'Trimestral' },
  { value: 'semiannual', label: 'Semestral' },
  { value: 'annual', label: 'Anual' }
];

export const CURRENCY_OPTIONS: SelectOption[] = [
  { value: 'USD', label: 'USD - Dólar Estadounidense' },
  { value: 'PEN', label: 'PEN - Sol Peruano' },
  { value: 'EUR', label: 'EUR - Euro' }
];

export const PAYER_OPTIONS: SelectOption[] = [
  { value: 'issuer', label: 'Emisor' },
  { value: 'investor', label: 'Inversor' },
  { value: 'shared', label: 'Compartido' }
];