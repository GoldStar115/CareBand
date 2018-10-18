import * as types from "../../actions/could/type";
const initialState = {
  isGetPatientInfo: false,
  isLoading: false,
  getPatientInfoError: null,
  patientInfo : null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PATIENT_INFO:
      return Object.assign({}, state, {
        isGetPatientInfo: false,
        isLoading: true,
        getPatientInfoError: null,
        patientInfo : null
      });
    case types.GET_PATIENT_INFO_SUCCESS:
      return Object.assign({}, state, {
        isGetPatientInfo: true,
        isLoading: false,
        getPatientInfoError: null,
        patientInfo : action.patientInfo
      });
    case types.GET_PATIENT_INFO_FAILURE:
      return Object.assign({}, state, {
        isGetPatientInfo: false,
        isLoading: false,
        getPatientInfoError: action.error,
        patientInfo : null
      });
    default:
      return state;
  }
};
