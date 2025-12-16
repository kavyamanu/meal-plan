"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import DayMenu from "@/components/DayMenu";
import { getTodayMeal, hasCustomMeals } from "@/lib/meals";
import { Meal } from "@/types/meal";

export default function Home() {
  const [todayMeal, setTodayMeal] = useState<Meal | null>(null);
  const [today, setToday] = useState("");
  const [isCustom, setIsCustom] = useState(false);

  const refreshMeal = () => {
    setTodayMeal(getTodayMeal());
    setToday(new Date().toLocaleDateString("en-US", { weekday: "long" }));
    setIsCustom(hasCustomMeals());
  };

  useEffect(() => {
    refreshMeal();

    // Listen for menu updates
    const handleUpdate = () => {
      refreshMeal();
    };
    window.addEventListener("mealPlanUpdated", handleUpdate);
    return () => window.removeEventListener("mealPlanUpdated", handleUpdate);
  }, []);

  if (!todayMeal) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50 flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50">
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-3xl">
        <header className="text-center mb-10 md:mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-purple-600 mb-3 md:mb-4">
            🍽️ Kids Meal Plan
          </h1>
          <p className="text-gray-600 text-xl md:text-2xl mb-2">Today&apos;s Menu</p>
          <p className="text-3xl md:text-4xl font-semibold text-pink-500 mt-3">{today}</p>
          {isCustom && (
            <div className="mt-4 inline-block bg-green-100 border-2 border-green-300 rounded-full px-4 py-2">
              <p className="text-green-700 font-medium text-sm">
                ✨ Using Custom Menu
              </p>
            </div>
          )}
        </header>

        <main className="mb-10 md:mb-12">
          <DayMenu meal={todayMeal} />
        </main>

        <footer className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/week"
              className="inline-block bg-purple-500 hover:bg-purple-600 text-white font-semibold text-lg py-4 px-8 rounded-full transition-colors shadow-md hover:shadow-lg"
            >
              View Weekly Menu →
            </Link>
            <Link
              href="/customize"
              className="inline-block bg-pink-500 hover:bg-pink-600 text-white font-semibold text-lg py-4 px-8 rounded-full transition-colors shadow-md hover:shadow-lg"
            >
              ✏️ Customize Menu
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}

