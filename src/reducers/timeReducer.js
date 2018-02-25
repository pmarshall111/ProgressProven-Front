import {
  TIME_START,
  TIME_PAUSE,
  TIME_PLAY,
  TIME_CHANGE_OF_DAY,
  TIME_FINISH,
  makeDeepCopy
} from "../actions/time";

export default function(state = [{}], action) {
  console.log([action, state]);
  var stateCopy = state.map(makeDeepCopy);
  var { sessions } = stateCopy[stateCopy.length - 1];
  switch (action.type) {
    case TIME_START:
      return [
        {
          timeStarted: action.payload,
          sessions: [{ timeStarted: action.payload }]
        }
      ];
    case TIME_PAUSE:
      sessions[sessions.length - 1].timeFinished = action.payload;
      return stateCopy;
    case TIME_PLAY:
      sessions.push({ timeStarted: action.payload });
      return stateCopy;
    case TIME_CHANGE_OF_DAY:
      stateCopy[stateCopy.length - 1].timeFinished = action.payload;
      sessions[sessions.length - 1].timeFinished = action.payload;
      stateCopy.push({
        timeStarted: action.payload,
        sessions: [{ timeStarted: action.payload }]
      });
      return stateCopy;
    default:
      return state;
  }
}
