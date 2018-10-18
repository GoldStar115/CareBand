import { Auth } from "aws-amplify";
import * as types from "./type";
import { Actions } from "react-native-router-flux";

export const authenticateSetRouter = () => async dispatch => {
    dispatch(authenticateRouter());
    Auth.currentAuthenticatedUser()
      .then(user => {
        dispatch(authenticateRouterSuccess(user));
      })
      .catch(err => {
        dispatch(authenticateRouterFailure(err));
      });
};

function authenticateRouter() {
    return {
      type: types.AUTHENTICATE
    };
  }
function authenticateRouterSuccess(user) {
  return {
    type: types.AUTHENTICATE_SUCCESS,
    user
  };
}

function authenticateRouterFailure(error) {
  return {
    type: types.AUTHENTICATE_FAILURE,
    error
  };
}

export const logOutSetRouter = () => async dispatch => {  
  dispatch(logout());
  Auth.signOut();
  dispatch(logoutSuccess())
  Actions.auth({type : 'reset'})
};
function logoutSuccess() {
  return {
    type: types.LOG_OUT_SUCCESS
  };
}
function logout() {
  return {
    type: types.LOG_OUT
  };
}

