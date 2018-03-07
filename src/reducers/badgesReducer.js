import { ALL_BADGES } from "../actions/badges";

export default function(state = [], action) {
  console.log(action);
  switch (action.type) {
    case ALL_BADGES:
      console.log({ badges: action.payload });
      return action.payload;
    default:
      return state;
  }
}
