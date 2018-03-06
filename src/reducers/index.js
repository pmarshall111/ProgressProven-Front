import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import userReducer from "./userReducer";
import timeReducer from "./timeReducer";
import playingReducer from "./playingReducer";
import badgesReducer from "./badgesReducer";
import areasReducer from "./areasReducer";

export default combineReducers({
  form: formReducer,
  user: userReducer,
  time: timeReducer,
  playing: playingReducer,
  badges: badgesReducer,
  areas: areasReducer
});
