'use client'

import { Suspense } from "react";
import ConfigSystemContent from "./components/ConfigSystemContent";

const ConfigSystem: React.FC = () => {

  return (
    <Suspense>
      <ConfigSystemContent />
    </Suspense>
  );
};

export default ConfigSystem;