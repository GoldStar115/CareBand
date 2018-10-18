import * as types from "../../actions/auth/type";
const initialState = {
  isConfirm: false,
  confirmError: null,
  isLoading: false,
  isResendConfirm : false,
  resendConfirmError : null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.CONFIRM_SIGNUP:
      return Object.assign({}, state, {
        isConfirm: false,
        isResendConfirm : false,
        isLoading: true,
        confirmError: null,
        resendConfirmError : null
      });
    case types.CONFIRM_SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        isConfirm: true,
        isLoading: false,
        confirmError: null,
        isResendConfirm : false,
        resendConfirmError : null
      });
    case types.CONFIRM_SIGNUP_FAILURE:
      return Object.assign({}, state, {
        isConfirm: true,
        isLoading: false,
        confirmError: action.error,
        isResendConfirm : false,
        resendConfirmError : null
      });
    case types.RESEND_CONFIRM_CODE:
      return Object.assign({}, state, {
        isConfirm: false,
        isResendConfirm : false,
        isLoading: true,
        confirmError: null,
        resendConfirmError : null
      });
    case types.RESEND_CONFIRM_CODE_SUCCESS:
      return Object.assign({}, state, {
        isConfirm: false,
        isLoading: false,
        confirmError: null,
        isResendConfirm : true,
        resendConfirmError : null
      });
    case types.RESEND_CONFIRM_CODE_FAILURE:
      return Object.assign({}, state, {
        isConfirm: false,
        isLoading: false,
        confirmError: null,
        isResendConfirm : true,
        resendConfirmError : action.error
      });
    default:
      return state;
  }
};
