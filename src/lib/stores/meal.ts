// type MealCount = { [mealName: string]: number };

// type DailyMeal = {
//   [personName: string]: MealCount;
// };

// type MealSchedule = {
//   [date: string]: DailyMeal;
// };

// const mealSchedule: MealSchedule = {
//   '2024-07-01': {
//     Alice: { A餐: 1, B餐: 1, 素食: 0 },
//     Bob: { A餐: 0, B餐: 2, 素食: 1 }
//   },
//   '2024-07-02': {
//     Alice: { A餐: 1, B餐: 0, 素食: 1 },
//     Bob: { A餐: 1, B餐: 1, 素食: 0 }
//   }
// };

export interface Meal {
  id: number;
  userId: number;
  orderDate: string;
  meals: { mealType: string; quantity: number }[];
}

export interface MonthMeal {
  [date: string]: Meal;
}

export let mealTypes: string[] = ['---', 'A餐', 'B餐', '素食', '合菜'];
