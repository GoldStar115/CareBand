import { Auth } from "aws-amplify";
import * as types from "./type";
export function forgotPassword(username) {
  return dispatch => {
    dispatch(forgotPassword());
    Auth.forgotPassword(username)
      .then(data => {
        console.log("data from confirmSignUp: ", data);
        dispatch(forgotPasswordSuccess());
      })
      .catch(err => {
        console.log("error signing up: ", err);
        dispatch(forgotPasswordFailure(err));
      });
  };
}
function forgotPassword() {
  return {
    type: types.FORGOT_PASSWORD
  };
}
function forgotPasswordSuccess() {
  return {
    type: types.FORGOT_PASSWORD_SUCCESS
  };
}

function forgotPasswordFailure(error) {
  return {
    type: types.FORGOT_PASSWORD_FAILURE,
    error
  };
}
