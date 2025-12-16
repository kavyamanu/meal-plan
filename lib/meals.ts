import { MealData, Meal } from "@/types/meal";
import mealsData from "@/data/meals.json";

const STORAGE_KEY = "custom-meal-plan";

export function getMeals(): MealData {
  // Check if custom menu exists in localStorage
  if (typeof window !== "undefined") {
    const customMenu = localStorage.getItem(STORAGE_KEY);
    if (customMenu) {
      try {
        return JSON.parse(customMenu);
      } catch (e) {
        console.error("Error parsing custom menu:", e);
      }
    }
  }
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

export function saveCustomMeals(meals: MealData) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(meals));
  }
}

export function resetToDefaultMeals() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
  }
}

export function hasCustomMeals(): boolean {
  if (typeof window !== "undefined") {
    return localStorage.getItem(STORAGE_KEY) !== null;
  }
  return false;
}

