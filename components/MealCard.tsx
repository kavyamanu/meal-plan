interface MealCardProps {
  title: string;
  meal: string;
  icon?: string;
}

export default function MealCard({ title, meal, icon }: MealCardProps) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-pink-100 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-2">
        {icon && <span className="text-2xl">{icon}</span>}
        <h3 className="text-lg font-semibold text-purple-600">{title}</h3>
      </div>
      <p className="text-gray-700 text-sm leading-relaxed">{meal}</p>
    </div>
  );
}

