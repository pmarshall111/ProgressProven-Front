import { ROOT_URL } from "./index";

export const DETAILED_TIME = "DETAILED_TIME";

export function getDetailedTimes() {
  return async dispatch => {
    var jsonData = await fetch(`${ROOT_URL}/time/detailed`, {
      method: "GET",
      credentials: "include"
    });
    var times = await jsonData.json();
    if (!times.error) {
      dispatch({
        type: DETAILED_TIME,
        payload: times.times
      });
    }
  };
}
