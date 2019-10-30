import { combineReducers } from "redux";

import Meal from "./meals_reducer";
import User from "./users_reducer";

export default combineReducers({
  Meal,
  User
});
