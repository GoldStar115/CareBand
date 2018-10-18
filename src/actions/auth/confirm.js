import { Auth } from "aws-amplify";

import * as types from './type'
import { authenticateSetRouter } from './router'
export function confirmUserSignUp(username, authCode) {
  return dispatch => {
    dispatch(confirmSignUp());
    Auth.confirmSignUp(username, authCode)
      .then(data => {
        console.log("data from confirmSignUp: ", data);
        dispatch(confirmSignUpSuccess());
        dispatch(authenticateSetRouter()) 
      })
      .catch(err => {
        console.log("error signing up: ", err);
        dispatch(confirmSignUpFailure(err));
      });
  };
}
function confirmSignUp() {
    return {
      type: types.CONFIRM_SIGNUP
    };
}
function confirmSignUpSuccess() {
  return {
    type: types.CONFIRM_SIGNUP_SUCCESS
  };
}

function confirmSignUpFailure(error) {
  return {
    type: types.CONFIRM_SIGNUP_FAILURE,
    error
  };
}

export function resendConfirmCode(username) {
  return dispatch => {
    dispatch(resendConfirmCode());
    Auth.resendSignUp(username)
      .then(data => {        
        console.log("data from confirmSignUp: ", data);
        dispatch(resendConfirmCodeSuccess());
      })
      .catch(err => {
        console.log("error signing up: ", err);
        dispatch(resendConfirmCodeFailure(err));
      });
  };
}
function resendConfirmCode() {
  return {
    type: types.RESEND_CONFIRM_CODE
  };
}
function resendConfirmCodeSuccess() {
  return {
    type: types.RESEND_CONFIRM_CODE_SUCCESS
  };
}

function resendConfirmCodeFailure(error) {
  return {
    type: types.RESEND_CONFIRM_CODE_FAILURE,
    error
  };
}

