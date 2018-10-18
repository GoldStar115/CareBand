import * as types from "../../actions/auth/type";
const initialState = {
  isResetPass: false,
  isLoading: false,
  resetPassError: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FORGOT_PASSWORD_SUBMIT:
      return Object.assign({}, state, {
        isResetPass: false,
        isLoading: true,
        resetPassError: null
      });
    case types.FORGOT_PASSWORD_SUBMIT_SUCCESS:
      return Object.assign({}, state, {
        isResetPass: true,
        isLoading: false,
        resetPassError: null
      });
    case types.FORGOT_PASSWORD_SUBMIT_FAILURE:
      return Object.assign({}, state, {
        isResetPass: false,
        isLoading: false,
        resetPassError: action.error
      });
    default:
      return state;
  }
};
