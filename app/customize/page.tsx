"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import DayPlanner from "@/components/DayPlanner";
import { Meal, MealData } from "@/types/meal";
import { saveCustomMeals, getAllMeals, resetToDefaultMeals } from "@/lib/meals";
import mealsData from "@/data/meals.json";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function CustomizePage() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [hasChanges, setHasChanges] = useState(false);

  const loadMeals = () => {
    const currentMeals = getAllMeals();
    setMeals(currentMeals);
  };

  useEffect(() => {
    // Load current meals (custom or default)
    loadMeals();

    // Refresh when window gains focus (user navigates back)
    const handleFocus = () => {
      loadMeals();
    };
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const handleMealUpdate = (day: string, updatedMeal: Meal) => {
    setMeals((prev) => {
      const newMeals = prev.map((meal) =>
        meal.day === day ? updatedMeal : meal
      );
      setHasChanges(true);
      return newMeals;
    });
  };

  const handleSave = () => {
    const mealData: MealData = { week: meals };
    saveCustomMeals(mealData);
    setHasChanges(false);
    // Trigger custom event to refresh other pages
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("mealPlanUpdated"));
    }
    alert("Menu saved successfully! 🎉");
  };

  const handleReset = () => {
    if (
      confirm(
        "Are you sure you want to reset to the default menu? This will clear your customizations."
      )
    ) {
      resetToDefaultMeals();
      const defaultMeals = (mealsData as MealData).week;
      setMeals(defaultMeals);
      setHasChanges(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50">
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        <header className="text-center mb-10 md:mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-purple-600 mb-3 md:mb-4">
            ✏️ Customize Menu
          </h1>
          <p className="text-gray-600 text-xl md:text-2xl">
            Plan your weekly meal menu
          </p>
        </header>

        <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
          <button
            onClick={handleSave}
            disabled={!hasChanges}
            className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold text-lg py-4 px-8 rounded-full transition-colors shadow-md hover:shadow-lg"
          >
            💾 Save Menu
          </button>
          <button
            onClick={handleReset}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-lg py-4 px-8 rounded-full transition-colors shadow-md hover:shadow-lg"
          >
            🔄 Reset to Default
          </button>
        </div>

        {hasChanges && (
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-4 mb-8 text-center">
            <p className="text-yellow-800 font-medium">
              ⚠️ You have unsaved changes. Don&apos;t forget to save!
            </p>
          </div>
        )}

        <main className="space-y-10 md:space-y-12 mb-10 md:mb-12">
          {DAYS.map((day) => {
            const meal = meals.find((m) => m.day === day);
            if (!meal) return null;
            return (
              <DayPlanner
                key={day}
                day={day}
                meal={meal}
                onUpdate={handleMealUpdate}
              />
            );
          })}
        </main>

        <footer className="text-center space-y-4">
          <Link
            href="/"
            className="inline-block bg-purple-500 hover:bg-purple-600 text-white font-semibold text-lg py-4 px-8 rounded-full transition-colors shadow-md hover:shadow-lg"
          >
            ← Back to Today
          </Link>
        </footer>
      </div>
    </div>
  );
}

