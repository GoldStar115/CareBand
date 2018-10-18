import * as types from "./type";
import { getLocation } from "../could/apiLocate";
export const tabNotification = userId => async dispatch => {
  dispatch(switchNotification(userId));
};
function switchNotification(userId) {
  return {
    type: types.SWITCH_NOTIFICATION,
    userId
  };
}
export const tabResident = userId => async dispatch => {
  dispatch(switchResident(userId));
};
function switchResident(userId) {
  return {
    type: types.SWITCH_RESIDENT,
    userId
  };
}
export const tabLocation = userId => async dispatch => {
  dispatch(getLocation(userId));
  dispatch(switchLocation(userId));
};
function switchLocation(userId) {
  return {
    type: types.SWITCH_LOCATION,
    userId
  };
}
