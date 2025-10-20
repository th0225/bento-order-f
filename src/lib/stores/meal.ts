type MealCount = { [mealName: string]: number };

type DailyMeal = {
  [personName: string]: MealCount;
};

type MealSchedule = {
  [date: string]: DailyMeal;
};

const mealSchedule: MealSchedule = {
  '2024-07-01': {
    Alice: { A餐: 1, B餐: 1, 素食: 0 },
    Bob: { A餐: 0, B餐: 2, 素食: 1 }
  },
  '2024-07-02': {
    Alice: { A餐: 1, B餐: 0, 素食: 1 },
    Bob: { A餐: 1, B餐: 1, 素食: 0 }
  }
};

export let mealTypes: string[] = [
  '---',
  'A餐',
  'B餐',
  '素食',
  '合菜',
  'A餐不飯',
  '合菜不飯',
  '素食不飯'
];


