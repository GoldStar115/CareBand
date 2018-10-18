import { Auth } from "aws-amplify";
import * as types from "./type";
export const getCurUserAction = () => async dispatch => {
    dispatch(getCurUser());
    Auth.currentAuthenticatedUser()
      .then(user => {
        dispatch(getCurUserSuccess(user));
      })
      .catch(err => {
        dispatch(getCurUserFailure(err));
      });
};

function getCurUser() {
    return {
      type: types.GET_CUR_USER
    };
  }
function getCurUserSuccess(user) {
  return {
    type: types.GET_CUR_USER_SUCCESS,
    user
  };
}

function getCurUserFailure(error) {
  return {
    type: types.GET_CUR_USER_FAILURE,
    error
  };
}