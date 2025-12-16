interface MealCardProps {
  title: string;
  meal: string;
  icon?: string;
}

export default function MealCard({ title, meal, icon }: MealCardProps) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-pink-100 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-3">
        {icon && <span className="text-xl">{icon}</span>}
        <h3 className="text-sm font-medium text-purple-400 uppercase tracking-wide">{title}</h3>
      </div>
      <p className="text-gray-800 text-xl md:text-2xl leading-relaxed font-medium">{meal}</p>
    </div>
  );
}

