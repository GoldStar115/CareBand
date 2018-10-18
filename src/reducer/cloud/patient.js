import * as types from "../../actions/could/type";
const initialState = {
  isGetPatient: false,
  isLoading: false,
  getPatientsError: null,
  patients: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PATIENT:
      return Object.assign({}, state, {
        isGetPatient: false,
        isLoading: true,
        getPatientsError: null,
        patients: null
      });
    case types.GET_PATIENT_SUCCESS:
      return Object.assign({}, state, {
        isGetPatient: true,
        isLoading: false,
        getPatientsError: null,
        patients: action.patients
      });
    case types.GET_PATIENT_FAILURE:
      return Object.assign({}, state, {
        isGetPatient: false,
        isLoading: false,
        getPatientsError: action.error,
        patients: null
      });
    default:
      return state;
  }
};
