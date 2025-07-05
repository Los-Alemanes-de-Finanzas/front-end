export interface BondFormData {
  // Basic bond information
  bondName: string;
  nominalValue: string;
  commercialValue: string;
  years: string;
  couponFrequency: string;
  daysPerYear: string;
  interestRateType: string;
  capitalization: string;
  interestRate: string;
  discountRate: string;
  issueDate: string;
  currency: string;
  
  // Initial costs
  primaPct: string;
  structurationPayer: string;
  placementPayer: string;
  flotationPayer: string;
  cavaliPayer: string;
  structurationPct: string;
  placementPct: string;
  flotationPct: string;
  cavaliPct: string;
}