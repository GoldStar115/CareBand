import { Auth } from "aws-amplify";
import * as types from "./type";
function signUp() {
  return {
    type: types.SIGN_UP
  };
}
function signUpSuccess(user) {
  return {
    type: types.SIGN_UP_SUCCESS,
    user
  };
}

function signUpFailure(err) {
  return {
    type: types.SIGN_UP_FAILURE,
    error: err
  };
}

export function createUser(
  username,
  password,
  email,
  phone_number,
  firstname,
  lastname,
  picture,
  facility_id
) {
  return dispatch => {
    dispatch(signUp());
    Auth.signUp({
      username,
      password,
      attributes: {
        email,
        phone_number,
        family_name: lastname,
        name: firstname,
        picture,
        updated_at: new Date().getTime().toString(),
        'custom:facility_id' : facility_id
      }
    })
      .then(data => {
        console.log("data from signUp: ", data);
        dispatch(signUpSuccess(data));
      })
      .catch(err => {
        console.log("error signing up: ", err);
        dispatch(signUpFailure(err));
      });
  };
}
