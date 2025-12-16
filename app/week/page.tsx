"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import DayMenu from "@/components/DayMenu";
import { getAllMeals, hasCustomMeals } from "@/lib/meals";
import { Meal } from "@/types/meal";

export default function WeekPage() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isCustom, setIsCustom] = useState(false);

  const refreshMeals = () => {
    setMeals(getAllMeals());
    setIsCustom(hasCustomMeals());
  };

  useEffect(() => {
    refreshMeals();

    // Listen for menu updates
    const handleUpdate = () => {
      refreshMeals();
    };
    window.addEventListener("mealPlanUpdated", handleUpdate);
    return () => window.removeEventListener("mealPlanUpdated", handleUpdate);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50">
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        <header className="text-center mb-8 md:mb-10">
          <h1 className="text-2xl md:text-3xl font-semibold text-purple-600 mb-1">
            🍽️ Kids Meal Plan
          </h1>
          <p className="text-gray-500 text-sm md:text-base mb-4">Weekly Menu</p>
          {isCustom && (
            <div className="mt-2 inline-block bg-green-100 border-2 border-green-300 rounded-full px-3 py-1">
              <p className="text-green-700 font-medium text-xs">
                ✨ Using Custom Menu
              </p>
            </div>
          )}
        </header>

        <main className="space-y-10 md:space-y-12 mb-10 md:mb-12">
          {meals.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">Loading...</p>
            </div>
          ) : (
            meals.map((meal, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 md:p-8 shadow-md border border-pink-100"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-pink-500 mb-6 md:mb-8 text-center">
                {meal.day}
              </h2>
              <DayMenu meal={meal} />
            </div>
            ))
          )}
        </main>

        <footer className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-block bg-purple-500 hover:bg-purple-600 text-white font-semibold text-base py-3 px-6 rounded-full transition-colors shadow-md hover:shadow-lg"
            >
              ← Back to Today
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}

