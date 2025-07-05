interface IndicatorFieldProps {
  label: string;
  value: string;
}

export const IndicatorField: React.FC<IndicatorFieldProps> = ({ label, value }) => {
  return (
    <div className="space-y-3">
      <h3 className="text-base font-semibold text-gray-700">
        {label}
      </h3>
      <input
        type="text"
        value={value}
        readOnly
        placeholder="Valor calculado"
        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
      />
    </div>
  );
};