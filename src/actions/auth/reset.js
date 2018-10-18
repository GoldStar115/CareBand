import { Auth } from "aws-amplify";
import * as types from "./type";
export function resetPassword(username, code, newpassword) {
  return dispatch => {
    dispatch(forgotPasswordSubmit())
    Auth.forgotPasswordSubmit(username, code, newpassword)
      .then(data => {
        console.log("data from confirmSignUp: ", data);
        dispatch(forgotPasswordSubmitSuccess());
      })
      .catch(err => {
        console.log("error signing up: ", err);
        dispatch(forgotPasswordSubmitFailure(err));
      });
  };
}
function forgotPasswordSubmit() {
    return {
      type: types.FORGOT_PASSWORD_SUBMIT
    };
  }
function forgotPasswordSubmitSuccess() {
  return {
    type: types.FORGOT_PASSWORD_SUBMIT_SUCCESS
  };
}

function forgotPasswordSubmitFailure(error) {
  return {
    type: types.FORGOT_PASSWORD_SUBMIT_FAILURE,
    error
  };
}
