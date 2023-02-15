import { combineReducers } from "redux";
import { photosReducer } from "./photos";
import { postsByUserReducer } from "./postsByUser";
import { userReducer } from "./users";

export const rootReducer = combineReducers({
  photos: photosReducer,
  users: userReducer,
  postsByUser: postsByUserReducer,
});
