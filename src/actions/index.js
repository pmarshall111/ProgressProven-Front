import { getAllBadges } from "./badges";

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
      if (!badges) getAllBadges(user.user);

      return dispatch({
        type: CURRENT_USER,
        payload: user.user
      });
    } else {
      console.log("activating callback");
      callback();
      return dispatch({
        type: FAILED_LOGIN,
        payload: user.error
      });
    }
  };
}

export function signUpInActionCreator(details, inOrUp, callback) {
  console.log(details);
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
    var user = await jsonData.json();

    console.log(user);

    if (!user.error) {
      getAllBadges(user);
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
