"use client";

import { Meal } from "@/types/meal";
import EditableMealCard from "./EditableMealCard";

interface EditableDayMenuProps {
  meal: Meal;
  onUpdate: (updatedMeal: Meal) => void;
}

const mealIcons: Record<string, string> = {
  breakfast: "🌅",
  lunch: "🍽️",
  snack: "🍎",
  dinner: "🌙",
};

export default function EditableDayMenu({ meal, onUpdate }: EditableDayMenuProps) {
  const handleMealUpdate = (type: keyof Meal, value: string) => {
    onUpdate({ ...meal, [type]: value });
  };

  return (
    <div className="space-y-5 md:space-y-6">
      <EditableMealCard
        title="Breakfast"
        meal={meal.breakfast}
        icon={mealIcons.breakfast}
        mealType="breakfast"
        onUpdate={(value) => handleMealUpdate("breakfast", value)}
      />
      <EditableMealCard
        title="Lunch"
        meal={meal.lunch}
        icon={mealIcons.lunch}
        mealType="lunch"
        onUpdate={(value) => handleMealUpdate("lunch", value)}
      />
      <EditableMealCard
        title="Snack"
        meal={meal.snack}
        icon={mealIcons.snack}
        mealType="snack"
        onUpdate={(value) => handleMealUpdate("snack", value)}
      />
      <EditableMealCard
        title="Dinner"
        meal={meal.dinner}
        icon={mealIcons.dinner}
        mealType="dinner"
        onUpdate={(value) => handleMealUpdate("dinner", value)}
      />
    </div>
  );
}

