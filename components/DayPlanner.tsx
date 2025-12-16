"use client";

import { Meal } from "@/types/meal";
import MealSelector from "./MealSelector";
import mealOptionsData from "@/data/meal-options.json";
import { MealOptions } from "@/types/meal-options";

interface DayPlannerProps {
  day: string;
  meal: Meal;
  onUpdate: (day: string, meal: Meal) => void;
}

const mealIcons: Record<string, string> = {
  breakfast: "🌅",
  lunch: "🍽️",
  snack: "🍎",
  dinner: "🌙",
};

export default function DayPlanner({ day, meal, onUpdate }: DayPlannerProps) {
  const options = mealOptionsData as MealOptions;

  const handleMealChange = (type: keyof Meal, value: string) => {
    onUpdate(day, { ...meal, [type]: value });
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-md border border-pink-100">
      <h2 className="text-3xl md:text-4xl font-bold text-purple-600 mb-6 md:mb-8 text-center">
        {day}
      </h2>
      <div className="space-y-5 md:space-y-6">
        <MealSelector
          label="Breakfast"
          options={options.breakfast}
          selected={meal.breakfast}
          onSelect={(value) => handleMealChange("breakfast", value)}
          icon={mealIcons.breakfast}
        />
        <MealSelector
          label="Lunch"
          options={options.lunch}
          selected={meal.lunch}
          onSelect={(value) => handleMealChange("lunch", value)}
          icon={mealIcons.lunch}
        />
        <MealSelector
          label="Snack"
          options={options.snack}
          selected={meal.snack}
          onSelect={(value) => handleMealChange("snack", value)}
          icon={mealIcons.snack}
        />
        <MealSelector
          label="Dinner"
          options={options.dinner}
          selected={meal.dinner}
          onSelect={(value) => handleMealChange("dinner", value)}
          icon={mealIcons.dinner}
        />
      </div>
    </div>
  );
}

