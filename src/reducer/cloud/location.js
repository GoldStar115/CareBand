import * as types from "../../actions/could/type";
const initialState = {
  isGetLocation: false,
  isLoading: true,
  getLocationError: null,
  result: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_LOCATION:
      return Object.assign({}, state, {
        isGetLocation: false,
        isLoading: true,
        getLocationError: null,
        result: null
      });
    case types.GET_LOCATION_SUCCESS:
      return Object.assign({}, state, {
        isGetLocation: true,
        isLoading: false,
        getLocationError: null,
        result: action.result
      });
    case types.GET_LOCATION_FAILURE:
      return Object.assign({}, state, {
        isGetLocation: false,
        isLoading: false,
        getLocationError: action.error,
        result: null
      });

    default:
      return state;
  }
};
