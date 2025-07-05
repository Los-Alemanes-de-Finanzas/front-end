'use client';
import { useState } from "react";
import { CustomSelect, SelectOption } from "./components/CustomSelect";
import { GenericButton } from "@/app/shared/components/GenericButton";
import { useRouter, useSearchParams } from "next/navigation";
import { Header } from "../components/Header";
interface ScheduleRow {
  period: number;
  fecha: string;
  cuota: number;
  amort: number;
  interes: number;
  saldo: number;
}

const PlazosDeGracia: React.FC = () => {
    const [selectedBond, setSelectedBond] = useState('');
    const [gracePeriodType, setGracePeriodType] = useState('');
    const [gracePeriodDuration, setGracePeriodDuration] = useState('');
    const [schedule, setSchedule] = useState<ScheduleRow[]>([]);

    const bondOptions: SelectOption[] = [
        { value: 'bond1', label: 'Bono Corporativo ABC - 5.5% 2028' },
        { value: 'bond2', label: 'Bono del Tesoro - 3.2% 2030' },
        { value: 'bond3', label: 'Bono Municipal XYZ - 4.8% 2025' },
        { value: 'bond4', label: 'Bono Verde DEF - 6.1% 2032' }
    ];

    const gracePeriodOptions: SelectOption[] = [
        { value: 'total', label: 'Plazo de gracia total' },
        { value: 'parcial', label: 'Plazo de gracia parcial' },
        { value: 'ninguno', label: 'Sin plazo de gracia' }
    ];

    const handleApply = () => {
        if (!selectedBond || !gracePeriodType || !gracePeriodDuration) {
        alert('Por favor complete todos los campos');
        return;
        }

        // Simulate schedule calculation
        const newSchedule: ScheduleRow[] = [
        {
            period: 1,
            fecha: '2025-07-30',
            cuota: 1000.00,
            amort: 0.00,
            interes: 1000.00,
            saldo: 100000.00
        },
        {
            period: 2,
            fecha: '2025-08-29',
            cuota: 2666.67,
            amort: 1666.67,
            interes: 1000.00,
            saldo: 100000.00
        },
        {
            period: 3,
            fecha: '2025-09-28',
            cuota: 2650.00,
            amort: 1666.67,
            interes: 983.33,
            saldo: 96666.67
        }
        ];

        setSchedule(newSchedule);
    };

    const formatCurrency = (amount: number) => {
        return amount.toFixed(2);
    };

    const router = useRouter();
    const searchParams = useSearchParams();
    const userName = searchParams.get('username') || 'Usuario';
    const userInitial = userName.charAt(0).toUpperCase();
  
    const handleLogout = () => {
      console.log('Logging out...');
      router.push('/');
    };

  return (
    <div className="bg-gray-50 min-h-screen">
        <Header userName={userName} userInitial={userInitial} onLogout={handleLogout} />
        <div className="max-w-6xl mx-auto">
            {/* Header */}
            <h1 className="text-3xl font-bold text-center text-gray-900 my-12">
            PLAZOS DE GRACIA
            </h1>
            
            {/* Form Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Bond Selection */}
            <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-700">
                Selecciona el bono
                </h2>
                <CustomSelect
                options={bondOptions}
                value={selectedBond}
                onChange={setSelectedBond}
                placeholder="Option"
                />
            </div>

            {/* Grace Period Type */}
            <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-700">
                Tipo de plazo de gracia
                </h2>
                <CustomSelect
                options={gracePeriodOptions}
                value={gracePeriodType}
                onChange={setGracePeriodType}
                placeholder="Option"
                />
            </div>
            </div>

            {/* Grace Period Duration */}
            <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Duración del plazo de gracia ( periodos )
            </h2>
            <input
                type="text"
                value={gracePeriodDuration}
                onChange={(e) => setGracePeriodDuration(e.target.value)}
                placeholder="Ingrese un valor"
                className="w-full max-w-sm px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
            </div>

            {/* Apply Button */}
            <div className="mb-12">
            <GenericButton
                text="Aplicar"
                color="teal"
                status="filled"
                size="md"
                onClick={handleApply}
                className="rounded-lg px-8"
            />
            </div>

            {/* Schedule Table */}
            {schedule.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 p-6 pb-0">
                    NUEVO CRONOGRAMA
                </h2>
                </div>
                
                <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                    <tr className="bg-teal-500 text-white">
                        <th className="px-6 py-4 text-center font-semibold">PERIODO</th>
                        <th className="px-6 py-4 text-center font-semibold">FECHA</th>
                        <th className="px-6 py-4 text-center font-semibold">CUOTA</th>
                        <th className="px-6 py-4 text-center font-semibold">AMORT.</th>
                        <th className="px-6 py-4 text-center font-semibold">INTERÉS</th>
                        <th className="px-6 py-4 text-center font-semibold">SALDO</th>
                    </tr>
                    </thead>
                    <tbody>
                    {schedule.map((row, index) => (
                        <tr key={row.period} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 text-center text-gray-900">{row.period}</td>
                        <td className="px-6 py-4 text-center text-gray-900">{row.fecha}</td>
                        <td className="px-6 py-4 text-center text-gray-900">{formatCurrency(row.cuota)}</td>
                        <td className="px-6 py-4 text-center text-gray-900">{formatCurrency(row.amort)}</td>
                        <td className="px-6 py-4 text-center text-gray-900">{formatCurrency(row.interes)}</td>
                        <td className="px-6 py-4 text-center text-gray-900">{formatCurrency(row.saldo)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
                
                {/* Three dots indicator */}
                <div className="flex justify-center py-6">
                <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                </div>
                </div>
            </div>
            )}
        </div>
    </div>
  );
};

export default PlazosDeGracia;