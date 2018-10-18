import * as types from "../../actions/auth/type";
const initialState = {
  isForgotPass: false,
  isLoading: false,
  forgotError: null
};
export default (state = initialState, action) => {
  switch (action.type) {
    case types.FORGOT_PASSWORD:
      return Object.assign({}, state, {
        isForgotPass: false,
        isLoading: true,
        forgotError: null
      });
    case types.FORGOT_PASSWORD_SUCCESS:
      return Object.assign({}, state, {
        isForgotPass: true,
        isLoading: false,
        forgotError: null
      });
    case types.FORGOT_PASSWORD_FAILURE:
      return Object.assign({}, state, {
        isForgotPass: false,
        isLoading: false,
        forgotError: action.error
      });
    default:
      return state;
  }
};
