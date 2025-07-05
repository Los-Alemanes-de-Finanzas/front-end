'use client';

import { Suspense } from "react";
import FinancialAnalysisContent from "./components/AnalisisFinancieroBonosContent";

const FinancialAnalysis: React.FC = () => {

  return (
    <Suspense fallback={<div>Cargando análisis...</div>}>
      <FinancialAnalysisContent />
    </Suspense>
  );
};

export default FinancialAnalysis;