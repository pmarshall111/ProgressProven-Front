import { CURRENT_USER } from "../actions";

export default function(state = null, action) {
  switch (action.type) {
    case CURRENT_USER:
      console.log(action.payload);
      return action.payload.improvementAreas;
    default:
      return state;
  }
}
