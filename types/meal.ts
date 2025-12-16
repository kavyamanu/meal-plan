export interface Meal {
  day: string;
  breakfast: string;
  lunch: string;
  snack: string;
  dinner: string;
}

export interface MealData {
  week: Meal[];
}

