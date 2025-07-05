import { Suspense } from "react";
import GracePeriodsContent from "./components/GracePeriodsContent";

export default function GracePeriods () {
    return (
        <Suspense>
            <GracePeriodsContent />
        </Suspense>
    );
}