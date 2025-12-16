"use client";

import { useState } from "react";
import mealOptionsData from "@/data/meal-options.json";
import { MealOptions } from "@/types/meal-options";

interface EditableMealCardProps {
  title: string;
  meal: string;
  icon?: string;
  mealType: "breakfast" | "lunch" | "snack" | "dinner";
  onUpdate: (meal: string) => void;
}

export default function EditableMealCard({
  title,
  meal,
  icon,
  mealType,
  onUpdate,
}: EditableMealCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempMeal, setTempMeal] = useState(meal);
  const options = mealOptionsData as MealOptions;

  const handleSave = () => {
    onUpdate(tempMeal);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempMeal(meal);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-3xl p-6 shadow-sm border-2 border-purple-300">
        <div className="flex items-center gap-2 mb-3">
          {icon && <span className="text-xl">{icon}</span>}
          <h3 className="text-sm font-medium text-purple-400 uppercase tracking-wide">
            {title}
          </h3>
        </div>
        <select
          value={tempMeal}
          onChange={(e) => setTempMeal(e.target.value)}
          className="w-full text-lg md:text-xl text-gray-800 font-medium bg-white border-2 border-pink-200 rounded-2xl px-4 py-3 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all mb-3"
          autoFocus
        >
          <option value="">Select {title.toLowerCase()}...</option>
          {options[mealType].map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-xl transition-colors"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-xl transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-pink-100 hover:shadow-md transition-shadow relative group">
      <div className="flex items-center gap-2 mb-3">
        {icon && <span className="text-xl">{icon}</span>}
        <h3 className="text-sm font-medium text-purple-400 uppercase tracking-wide">
          {title}
        </h3>
      </div>
      <p className="text-gray-800 text-xl md:text-2xl leading-relaxed font-medium pr-14 md:pr-16">
        {meal}
      </p>
      <button
        onClick={() => setIsEditing(true)}
        className="absolute top-4 right-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity bg-purple-100 hover:bg-purple-200 active:bg-purple-300 text-purple-600 p-3 md:p-2.5 rounded-lg text-lg md:text-base font-medium touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
        title="Edit meal"
        aria-label="Edit meal"
      >
        ✏️
      </button>
    </div>
  );
}

