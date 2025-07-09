'use client'
import { Suspense } from "react";
import { NewProyectionBondContent } from "./components/NewProyectionBondContent";

export default function NewProyectionBond() {
    return (
        <Suspense>
            <NewProyectionBondContent />
        </Suspense>
    );
}