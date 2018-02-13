import { CURRENT_USER, FAILED_LOGIN } from "../actions";

export default function(state = null, action) {
  switch (action.type) {
    case CURRENT_USER:
      return action.payload;
    case FAILED_LOGIN:
      return null;
    default:
      return state;
  }
}
