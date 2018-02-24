import { PLAY, PAUSE, TIME_START } from "../actions/time";

export default function(state = { playing: false, stopwatchTime: 0 }, action) {
  switch (action.type) {
    case TIME_START:
    case PLAY:
      return { ...state, playing: true };
    case PAUSE:
      return { playing: false, stopwatchTime: action.payload };
    default:
      return state;
  }
}
