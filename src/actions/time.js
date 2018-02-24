import { ROOT_URL, CURRENT_USER } from "./index";

export const TIME_START = "TIME_START";
export const TIME_PAUSE = "TIME_PAUSE";
export const TIME_PLAY = "TIME_PLAY";
export const TIME_CHANGE_OF_DAY = "TIME_CHANGE_OF_DAY";
export const TIME_FINISH = "TIME_FINISH";

export const DB_ERROR = "DB_ERROR";

export const PAUSE = "PAUSE";
export const PLAY = "PLAY";

export function togglePlay(playing, stopwatchTime) {
  return playing
    ? {
        type: PLAY
      }
    : { type: PAUSE, payload: stopwatchTime };
}

export function timeStartActionCreator(stamp) {
  return {
    type: TIME_START,
    payload: stamp
  };
}

export function timePauseActionCreator(stamp) {
  return {
    type: TIME_PAUSE,
    payload: stamp
  };
}

export function timePlayActionCreator(stamp) {
  return {
    type: TIME_PLAY,
    payload: stamp
  };
}

export function timeChangeDayActionCreator(stamp) {
  return {
    type: TIME_CHANGE_OF_DAY,
    payload: stamp
  };
}

export function timeFinishActionCreator(timeInfo, state) {
  //in here add stamp to time state
  var { goalId, mood, tags, stamp } = timeInfo;

  var sendToMongo = state.map(makeDeepCopy);
  var { sessions } = sendToMongo[sendToMongo.length - 1];

  var lastSessionEnd = sessions[sessions.length - 1].timeFinished;
  if (!lastSessionEnd) sessions[sessions.length - 1].timeFinished = stamp;

  sendToMongo[sendToMongo.length - 1].timeFinished = stamp;

  sendToMongo.forEach(day => {
    day.tags = tags;
    day.mood = mood;
  });

  // console.log(sendToMongo);
  // return async dispatch => {
  //   var jsonData = await fetch(`${ROOT_URL}/time/new`, {
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json"
  //     },
  //     method: "POST",
  //     credentials: "include",
  //     body: JSON.stringify(sendToMongo)
  //   });
  //   var user = await jsonData.json();
  //   if (!user.error) {
  //     return dispatch({
  //       type: CURRENT_USER,
  //       payload: user.user
  //     });
  //   } else {
  //     return dispatch({
  //       type: DB_ERROR,
  //       payload: user.error
  //     });
  //   }
  // };
}

export function makeDeepCopy(obj) {
  if (obj.sessions) {
    var sessionsCopy = obj.sessions.map(x => {
      return { ...x };
    });
  }
  return { ...obj, sessions: sessionsCopy };
}
