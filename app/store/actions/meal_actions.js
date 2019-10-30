import { TOGGLE_FAVORITE, SET_FILTERS } from "../types";

export const toggleFavorite = mealId => {
  return {
    type: TOGGLE_FAVORITE,
    mealId
  };
};

export const setFilters = (filters) => {
	console.log('setFilters', filters)
  return {
    type: SET_FILTERS,
    filters: filters
  }
}