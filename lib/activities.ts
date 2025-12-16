import { ActivityData, Activity } from "@/types/activity";
import activitiesData from "@/data/activities.json";

const STORAGE_KEY = "custom-activities";

export function getActivities(): ActivityData {
  // Check if custom activities exist in localStorage
  if (typeof window !== "undefined") {
    const customActivities = localStorage.getItem(STORAGE_KEY);
    if (customActivities) {
      try {
        return JSON.parse(customActivities);
      } catch (e) {
        console.error("Error parsing custom activities:", e);
      }
    }
  }
  return activitiesData as ActivityData;
}

export function getActivityForDay(dayOffset: number = 0): Activity {
  const activities = getActivities();
  const today = new Date().getDay();
  // Convert Sunday (0) to index 6, Monday (1) to 0, etc.
  const dayIndex = today === 0 ? 6 : today - 1;
  const targetIndex = (dayIndex + dayOffset) % 7;
  return activities.week[targetIndex];
}

export function getDayName(dayOffset: number = 0): string {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const today = new Date().getDay();
  const dayIndex = today === 0 ? 6 : today - 1;
  const targetIndex = (dayIndex + dayOffset) % 7;
  return days[targetIndex];
}

export function getAllActivities() {
  return getActivities().week;
}

export function saveCustomActivities(activities: ActivityData) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
  }
}

export function resetToDefaultActivities() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
  }
}

export function hasCustomActivities(): boolean {
  if (typeof window !== "undefined") {
    return localStorage.getItem(STORAGE_KEY) !== null;
  }
  return false;
}

