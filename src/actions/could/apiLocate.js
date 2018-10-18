import { X_API_KEY } from "react-native-dotenv";
import { AsyncStorage } from "react-native";
import axios from "react-native-axios";
import { Auth } from "aws-amplify";
import * as paths from "./path";
import * as types from "./type";
import R from "ramda";

import { residentmodel } from "../../data/testuesr";

/// Get Resident Profile
export const getLocation = user_id => async dispatch => {
  dispatch(getLocationStart());
  AsyncStorage.getItem("USERID")
    .then(value => {
      setTimeout(() => {
        dispatch(getLocationSuccess(getLocationWithID(user_id)));
      }, 2000);
    })
    .catch(error => {
      dispatch(getLocationFailure(error));
    });
};
function getLocationWithID(residentid) {
  var result = [];
  if (residentid == undefined) {
    residentmodel.forEach(row => {
      result.push(row);
    });
  } else {
    const res = R.find(R.propEq("_id", residentid))(residentmodel);
    result.push(res);
  }
  return result;
}
function getLocationStart() {
  return {
    type: types.GET_LOCATION
  };
}
function getLocationSuccess(result) {
  return {
    type: types.GET_LOCATION_SUCCESS,
    result
  };
}

function getLocationFailure(error) {
  return {
    type: types.GET_LOCATION_FAILURE,
    error
  };
}
