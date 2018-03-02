import { ALL_BADGES } from "../actions/badges";

export default function(state = [], action) {
  console.log(action);
  switch (action.type) {
    case ALL_BADGES:
      return action.payload;
    default:
      return state;
  }
}
