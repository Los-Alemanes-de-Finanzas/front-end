'use client';
import { GenericButton } from "@/app/shared/components/GenericButton";
import { Header } from "../components/Header";
import { useRouter, useSearchParams } from 'next/navigation';

interface Bond {
  id: number;
  name: string;
}



const MisBonosGuardados = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const userName = searchParams.get('username') || 'Usuario';
    const userInitial = userName.charAt(0).toUpperCase();

    const bonds: Bond[] = [
        { id: 1, name: "Bono 1" },
        { id: 2, name: "Bono 2" },
        { id: 3, name: "Bono 3" }
    ];

    const handleLogout = () => {
        console.log('Logging out...');
        router.push('/');
    }

    const handleView = (bondId: number) => {
        console.log(`Ver bono ${bondId}`);
    };

    const handleDelete = (bondId: number) => {
        console.log(`Eliminar bono ${bondId}`);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header userName={userName} userInitial={userInitial} onLogout={handleLogout} />
            <div className="max-w-6xl mx-auto">
            {/* Header */}
            
            <h1 className="text-3xl font-bold text-center text-gray-900 my-16">
            MIS BONOS GUARDADOS
            </h1>
            
            {/* Bonds List */}
            <div className="space-y-8">
            {/* Header Row */}
            <div className="grid grid-cols-12 gap-6 items-center">
                <div className="col-span-6">
                <h2 className="text-lg font-semibold text-gray-700">
                    Nombre del bono
                </h2>
                </div>
                <div className="col-span-3"></div>
                <div className="col-span-3"></div>
            </div>

            {/* Bond Rows */}
            {bonds.map((bond) => (
                <div key={bond.id} className="grid grid-cols-12 gap-6 items-center">
                {/* Bond Name Input */}
                <div className="col-span-6">
                    <input
                    type="text"
                    value={bond.name}
                    readOnly
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                </div>
                
                {/* Ver Button */}
                <div className="col-span-3">
                    <GenericButton
                    text="Ver"
                    color="teal"
                    status="filled"
                    size="md"
                    fullWidth={true}
                    onClick={() => handleView(bond.id)}
                    className="rounded-lg"
                    />
                </div>
                
                {/* Eliminar Button */}
                <div className="col-span-3">
                    <GenericButton
                    text="Eliminar"
                    color="teal"
                    status="filled"
                    size="md"
                    fullWidth={true}
                    onClick={() => handleDelete(bond.id)}
                    className="rounded-lg"
                    />
                </div>
                </div>
            ))}
            </div>
        </div>
        </div>
    );
};

export default MisBonosGuardados;