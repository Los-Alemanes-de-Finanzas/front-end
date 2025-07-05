import { Suspense } from "react";
import MyBondsContent from "./components/MyBondsContent";

export default function MyBonds() {
    return (
        <Suspense>
             <MyBondsContent />
        </Suspense>
    );
}