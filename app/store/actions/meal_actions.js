import { TOGGLE_FAVORITE } from "../types";

export const toggleFavorite = mealId => {
	console.log('toggleFavorite', mealId)
  return {
    type: TOGGLE_FAVORITE,
    mealId
  };
};
