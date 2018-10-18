import { X_API_KEY } from "react-native-dotenv";
import axios from "react-native-axios";
import { API } from "aws-amplify";
import * as types from "./type";
import * as paths from "./path";
import { Auth } from "aws-amplify";

export const getPatientsAction = path => async dispatch => {
  dispatch(getPatients());
  const user = await Auth.currentSession();
  const token = user.idToken.jwtToken;
  const header = {
    headers: {
      Authorization: token
    }
  };
  API.get(paths.ApiName, paths.patientsPathWithFacilityId, header)
    .then(result => {
      alert('Result ==> ' + JSON.stringify(result))
      const users = result.filter(user =>
        `${user.usertype}`
          .toUpperCase()
          .includes('RESIDENTS')
      );
      dispatch(getPatientsSuccess(users));
    })
    .catch(error => {
      alert("Error ==> " + error.message);
      dispatch(getPatientsFailure(error));
    });
};
function getPatients() {
  return {
    type: types.GET_PATIENT
  };
}
function getPatientsSuccess(patients) {
  return {
    type: types.GET_PATIENT_SUCCESS,
    patients
  };
}
function getPatientsFailure(error) {
  return {
    type: types.GET_PATIENT_FAILURE,
    error
  };
}
/// Get Resident Profile
export const getPatientInfo = device_id => async dispatch => {
  const user = await Auth.currentSession();
  const token = user.idToken.jwtToken;
  const header = {
    headers: {
      "x-api-key": X_API_KEY,
      Authorization: token
    }
  };
  dispatch(getPatientInfoStart());
  var resBattery = [];
  var resNote = [];
  try {
    const res = await axios.get(
      `${paths.BaseUrl}${paths.devicesPathWithBattery}?device=${device_id}`,
      header
    );
    resBattery = res.data.Items;
  } catch (error) {
    dispatch(getPatientInfoFailure(error));
    return;
  }
  try {
    const res = await axios.get(
      `${paths.BaseUrl}${paths.devicesPathWithBattery}?device=${device_id}`,
      header
    );
    resNote = res.data.Items;
  } catch (error) {
    dispatch(getPatientInfoFailure(error));
    return;
  }
  const result = {
    battery: resBattery,
    note: resNote
  };
  dispatch(getPatientInfoSuccess(result));
};

function getPatientInfoStart() {
  return {
    type: types.GET_PATIENT_INFO
  };
}
function getPatientInfoSuccess(patientInfo) {
  return {
    type: types.GET_PATIENT_INFO_SUCCESS,
    patientInfo
  };
}

function getPatientInfoFailure(error) {
  return {
    type: types.GET_PATIENT_INFO_FAILURE,
    error
  };
}

