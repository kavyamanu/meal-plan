import Link from "next/link";
import DayMenu from "@/components/DayMenu";
import { getAllMeals } from "@/lib/meals";

export default function WeekPage() {
  const meals = getAllMeals();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-600 mb-2">
            🍽️ Kids Meal Plan
          </h1>
          <p className="text-gray-600 text-lg">Weekly Menu</p>
        </header>

        <main className="space-y-8 mb-8">
          {meals.map((meal, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 shadow-md border border-pink-100"
            >
              <h2 className="text-2xl font-bold text-purple-600 mb-4 text-center">
                {meal.day}
              </h2>
              <DayMenu meal={meal} />
            </div>
          ))}
        </main>

        <footer className="text-center">
          <Link
            href="/"
            className="inline-block bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-full transition-colors shadow-md hover:shadow-lg"
          >
            ← Back to Today
          </Link>
        </footer>
      </div>
    </div>
  );
}

