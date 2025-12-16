"use client";

interface MealSelectorProps {
  label: string;
  options: string[];
  selected: string;
  onSelect: (meal: string) => void;
  icon?: string;
}

export default function MealSelector({
  label,
  options,
  selected,
  onSelect,
  icon,
}: MealSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-2">
        {icon && <span className="text-xl">{icon}</span>}
        <label className="text-sm font-medium text-purple-400 uppercase tracking-wide">
          {label}
        </label>
      </div>
      <select
        value={selected}
        onChange={(e) => onSelect(e.target.value)}
        className="w-full text-lg md:text-xl text-gray-800 font-medium bg-white border-2 border-pink-200 rounded-2xl px-4 py-3 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all"
      >
        <option value="">Select {label.toLowerCase()}...</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

