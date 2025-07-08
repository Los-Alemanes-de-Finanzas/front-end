import { Suspense } from "react";
import { SpecificBondContent } from "./components/Content";

export default function SpecificBond() {
    return (
        <Suspense>
            <SpecificBondContent />
        </Suspense>
    );
}