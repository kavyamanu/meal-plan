# Kids Meal Plan

A simple, mobile-friendly meal menu website for kids (ages 2–5) showing a weekly South Indian meal plan.

## Features

- 🍽️ Today's menu on the home page
- 📅 Weekly menu view showing all 7 days
- 📱 Mobile-first, responsive design
- 🎨 Kid-friendly UI with soft colors and rounded cards
- 🍛 South Indian meal plan with Breakfast, Lunch, Snack, and Dinner

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── page.tsx          # Home page (today's menu)
│   ├── week/
│   │   └── page.tsx       # Weekly menu page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/
│   ├── MealCard.tsx       # Reusable meal card component
│   └── DayMenu.tsx        # Day menu component
├── data/
│   └── meals.json         # Meal data (weekly plan)
├── lib/
│   └── meals.ts           # Meal data utilities
└── types/
    └── meal.ts            # TypeScript types
```

## Customizing Meals

Edit `data/meals.json` to update the meal plan. The structure includes:
- `day`: Day of the week
- `breakfast`: Breakfast meal
- `lunch`: Lunch meal
- `snack`: Snack
- `dinner`: Dinner meal

## Build for Production

```bash
npm run build
npm start
```

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **React 18**

