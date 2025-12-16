import Link from "next/link";
import DayMenu from "@/components/DayMenu";
import { getTodayMeal } from "@/lib/meals";

export default function Home() {
  const todayMeal = getTodayMeal();
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-600 mb-2">
            🍽️ Kids Meal Plan
          </h1>
          <p className="text-gray-600 text-lg">Today&apos;s Menu</p>
          <p className="text-2xl font-semibold text-pink-500 mt-2">{today}</p>
        </header>

        <main className="mb-8">
          <DayMenu meal={todayMeal} />
        </main>

        <footer className="text-center">
          <Link
            href="/week"
            className="inline-block bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-full transition-colors shadow-md hover:shadow-lg"
          >
            View Weekly Menu →
          </Link>
        </footer>
      </div>
    </div>
  );
}

