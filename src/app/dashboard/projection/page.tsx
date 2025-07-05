import { Suspense } from "react";
import { NewProyectionBondContent } from "./components/NewProyectionBondContent";

export const NewProyectionBond = () => {
    return (
        <Suspense>
            <NewProyectionBondContent />
        </Suspense>
    );
}