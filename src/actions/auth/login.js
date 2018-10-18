import { Auth } from "aws-amplify";
import * as types from "./type";
import { authenticateSetRouter } from './router'
import { Actions } from "react-native-router-flux";
function logIn() {
  return {
    type: types.LOG_IN
  };
}
function logInSuccess(user) {
  return {
    type: types.LOG_IN_SUCCESS,
    user
  };
}

function logInFailure(err) {
  return {
    type: types.LOG_IN_FAILURE,
    error: err
  };
}

export function authenticate(username, password) {
  return dispatch => {
    dispatch(logIn());
    Auth.signIn(username, password)
      .then(user => {
        dispatch(logInSuccess(user));
        dispatch(authenticateSetRouter())        
      })
      .catch(err => {
        console.log("errror from signIn: ", err);
        dispatch(logInFailure(err));
      });
  };
}
