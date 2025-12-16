import MealCard from "./MealCard";
import { Meal } from "@/types/meal";

interface DayMenuProps {
  meal: Meal;
}

const mealIcons: Record<string, string> = {
  breakfast: "🌅",
  lunch: "🍽️",
  snack: "🍎",
  dinner: "🌙",
};

export default function DayMenu({ meal }: DayMenuProps) {
  return (
    <div className="space-y-5 md:space-y-6">
      <MealCard
        title="Breakfast"
        meal={meal.breakfast}
        icon={mealIcons.breakfast}
      />
      <MealCard title="Lunch" meal={meal.lunch} icon={mealIcons.lunch} />
      <MealCard title="Snack" meal={meal.snack} icon={mealIcons.snack} />
      <MealCard title="Dinner" meal={meal.dinner} icon={mealIcons.dinner} />
    </div>
  );
}

