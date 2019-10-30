import { TOGGLE_FAVORITE, SET_FILTERS } from "../types";

import { MEALS } from "../../data/dummy-data";

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const existingIndex = state.favoriteMeals.findIndex(
        meal => meal.id === action.mealId
      );
      if (existingIndex >= 0) {
        const updatedFavMeals = [...state.favoriteMeals];
        updatedFavMeals.splice(existingIndex, 1);
        return {
          ...state,
          favoriteMeals: updatedFavMeals
        };
      } else {
        const meal = MEALS.find(meal => meal.id === action.mealId);
        return {
          ...state,
          favoriteMeals: state.favoriteMeals.concat(meal)
        };
      }
    case SET_FILTERS:
      const filters = action.filters;
      const updatedFilteredMeals = state.filteredMeals.filter(meal => {
        if (filters.glutenFree && !meal.isGlutenFree) {
          return false;
        }
        if (filters.lactoseFree && !meal.isLactoseFree) {
          return false;
        }
        if (filters.vegan && !meal.isVegan) {
          return false;
        }
        if (filters.vegetarian && !meal.isVegetarian) {
          return false;
        }
        return true;
      });
      return {
        ...state,
        filteredMeals: updatedFilteredMeals
      };
    default:
      return state;
  }
};
