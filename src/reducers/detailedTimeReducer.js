import { DETAILED_TIME } from "../actions/detailedTime";

export default function(state = [], action) {
  switch (action.type) {
    case DETAILED_TIME:
      console.log(action.payload);
      return action.payload;
    default:
      return state;
  }
}
