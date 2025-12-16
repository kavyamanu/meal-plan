import { MealData, Meal } from "@/types/meal";
import mealsData from "@/data/meals.json";

export function getMeals(): MealData {
  return mealsData as MealData;
}

export function getTodayMeal(): Meal {
  const meals = getMeals();
  const today = new Date().getDay();
  // Convert Sunday (0) to index 6, Monday (1) to 0, etc.
  const dayIndex = today === 0 ? 6 : today - 1;
  return meals.week[dayIndex];
}

export function getAllMeals() {
  return getMeals().week;
}

