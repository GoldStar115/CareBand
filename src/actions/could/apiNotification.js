import { X_API_KEY } from "react-native-dotenv";
import { AsyncStorage } from "react-native";
import axios from "react-native-axios";
import * as types from "./type";
import R from "ramda";

import {
  notifications, notemodel
} from "../../data/testuesr";
/// Get Notifications

export const getNotificationInfo = () => async dispatch => {
  dispatch(getNotificationStart());  
  AsyncStorage.getItem("USERID").then(value => {  
    // Test
    var userid = "09CEE95A-ED9B-CE04-6618-207F1E8404E0";       
    setTimeout(() => {
      dispatch(getNotificationSuccess(getNotificationWithUserId(userid)));
    },2000)
  }).catch(error => {
    dispatch(getNotificationFailure(error));
  });
};
function getNotificationWithUserId(userid) {
    var notidata = [];
    notifications.forEach(row => {
      if (row.sender._id === userid) {
        notidata.push(row);
      }
    });    
    return notidata;  
}
function updateNotificationStart() {
  return {
    type: types.UPDATE_NOTIFICATION
  };
}
function getNotificationStart() {
  return {
    type: types.GET_NOTIFICATION
  };
}
function getNotificationSuccess(notifications) {
  return {
    type: types.GET_NOTIFICATION_SUCCESS,
    notifications
  };
}

function getNotificationFailure(error) {
  return {
    type: types.GET_NOTIFICATION_FAILURE,
    error
  };
}
/// Update notification with Note
export const updateNotificationNote = (note, notiId) => async dispatch => {
  updateNote(note, notiId);
  dispatch(updateNotificationStart());  
  AsyncStorage.getItem("USERID").then(value => {  
    // Test
    var userid = "09CEE95A-ED9B-CE04-6618-207F1E8404E0";       
    setTimeout(() => {
      dispatch(getNotificationSuccess(getNotificationWithUserId(userid)));
    },2000)
  }).catch(error => {
    dispatch(getNotificationFailure(error));
  });
};
function updateNote(note, notiid) {
  var result = true;
  const checkIndex = R.findIndex(R.propEq("_id", note._id))(notemodel);
  if (checkIndex != -1) {
    R.update(note, checkIndex, notemodel);
  } else {
    notemodel.push(checkIndex);
  }
  const checkNotiIdx = R.findIndex(R.propEq("_id", notiid))(notifications);
  if (checkNotiIdx != -1) {
    notifications[checkNotiIdx].note = note;
  } else {
    result = false;
  }  return result;
}
/// Update notification with status
export const updateNotificationStatus = (notiId, status) => async dispatch => {
  updateStatus(notiId, status);
  dispatch(updateNotificationStart());  
  AsyncStorage.getItem("USERID").then(value => {  
    // Test
    var userid = "09CEE95A-ED9B-CE04-6618-207F1E8404E0";       
    setTimeout(() => {
      dispatch(getNotificationSuccess(getNotificationWithUserId(userid)));
    },2000)
  }).catch(error => {
    dispatch(getNotificationFailure(error));
  });
};
function updateStatus(notiId, status) {
  const checkIndex = R.findIndex(R.propEq("_id", notiId))(notifications);
  notifications[checkIndex].status = status;
  return true;
}