"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import EditableActivityCard from "@/components/EditableActivityCard";
import {
  getActivityForDay,
  getDayName,
  getAllActivities,
  saveCustomActivities,
  hasCustomActivities,
} from "@/lib/activities";
import { Activity, ActivityData } from "@/types/activity";

export default function ActivitiesPage() {
  const [dayOffset, setDayOffset] = useState(0);
  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);
  const [dayName, setDayName] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const loadActivity = (offset: number) => {
    const activity = getActivityForDay(offset);
    const day = getDayName(offset);
    setCurrentActivity(activity);
    setDayName(day);
    setIsCustom(hasCustomActivities());
  };

  useEffect(() => {
    loadActivity(dayOffset);
  }, [dayOffset]);

  const handleActivityUpdate = (updatedActivity: string) => {
    if (!currentActivity) return;

    const updated = { ...currentActivity, activity: updatedActivity };
    setCurrentActivity(updated);
    setHasChanges(true);

    // Update the activity in the full week data
    const allActivities = getAllActivities();
    const updatedActivities = allActivities.map((a) =>
      a.day === updated.day ? updated : a
    );
    const activityData: ActivityData = { week: updatedActivities };
    saveCustomActivities(activityData);

    // Trigger update event
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("activitiesUpdated"));
    }
  };

  const handleNextDay = () => {
    setDayOffset((prev) => (prev + 1) % 7);
    setHasChanges(false);
  };

  const handlePreviousDay = () => {
    setDayOffset((prev) => (prev - 1 + 7) % 7);
    setHasChanges(false);
  };

  if (!currentActivity) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50 flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50">
      <div className="container mx-auto px-4 py-6 md:py-8 max-w-3xl">
        <header className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-purple-600 mb-1">
            🎨 After School Activities
          </h1>
          <p className="text-gray-500 text-sm md:text-base mb-4">Today&apos;s Activity</p>
          <p className="text-4xl md:text-5xl font-bold text-pink-500 mb-2">
            {dayName}
          </p>
          {hasChanges && (
            <div className="mt-2 inline-block bg-green-100 border-2 border-green-300 rounded-full px-3 py-1">
              <p className="text-green-700 font-medium text-xs">✓ Saved</p>
            </div>
          )}
        </header>

        <main className="mb-8 md:mb-10">
          <EditableActivityCard
            activity={currentActivity.activity}
            onUpdate={handleActivityUpdate}
          />
        </main>

        <footer className="text-center space-y-4">
          <div className="flex gap-4 justify-center">
            <button
              onClick={handlePreviousDay}
              className="bg-purple-500 hover:bg-purple-600 text-white font-semibold text-base py-3 px-6 rounded-full transition-colors shadow-md hover:shadow-lg"
            >
              ← Previous Day
            </button>
            <button
              onClick={handleNextDay}
              className="bg-purple-500 hover:bg-purple-600 text-white font-semibold text-base py-3 px-6 rounded-full transition-colors shadow-md hover:shadow-lg"
            >
              Next Day →
            </button>
          </div>
          <div className="pt-4">
            <Link
              href="/"
              className="inline-block bg-pink-500 hover:bg-pink-600 text-white font-semibold text-base py-3 px-6 rounded-full transition-colors shadow-md hover:shadow-lg"
            >
              ← Back to Meals
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}

