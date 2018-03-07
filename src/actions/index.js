import { getAllBadges } from "./badges";
import { getDetailedTimes } from "./detailedTime";

export const ROOT_URL =
  process.env.NODE_ENV === "production" ? "fill in" : "http://localhost:5000";

export const CURRENT_USER = "CURRENT_USER";
export const FAILED_LOGIN = "FAILED_LOGIN";

export function currentUser(callback, badges) {
  return async function(dispatch) {
    var jsonData = await fetch(`${ROOT_URL}/current-user`, {
      method: "GET",
      credentials: "include"
    });
    var user = await jsonData.json();

    if (!user.error) {
      // if (!badges) dispatch(getAllBadges(user.user));
      dispatch(getDetailedTimes());

      dispatch({
        type: CURRENT_USER,
        payload: user.user
      });
    } else {
      console.log("activating callback");
      callback();
      dispatch({
        type: FAILED_LOGIN,
        payload: user.error
      });
    }
  };
}

export function signUpInActionCreator(details, inOrUp, callback) {
  console.log({ details });
  return async dispatch => {
    var jsonData = await fetch(`${ROOT_URL}/auth/${inOrUp}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      credentials: "include",
      body: JSON.stringify(details)
    });
    console.log(jsonData);
    var user = await jsonData.json();

    console.log(user);

    console.log(user.user.improvementAreas[0].time);

    if (!user.error) {
      // getAllBadges(user.user);
      dispatch(getDetailedTimes());
      callback();
      dispatch({
        type: CURRENT_USER,
        payload: user.user
      });
    } else {
      dispatch({
        type: FAILED_LOGIN,
        payload: user.error
      });
    }
  };
}

export function createGoalActionCreator(details, callback) {
  return async dispatch => {
    var jsonData = await fetch(`${ROOT_URL}/area/new`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      credentials: "include",
      body: JSON.stringify(details)
    });
    var user = await jsonData.json();

    console.log(user);

    if (!user.error) {
      callback();
      return dispatch({
        type: CURRENT_USER,
        payload: user
      });
    } else {
      return dispatch({
        type: FAILED_LOGIN,
        payload: user.error
      });
    }
  };
}
