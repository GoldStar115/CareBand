import * as types from "../../actions/auth/type";
const initialState = {
  isRegister: false,
  isLoading: false,
  registerError: null,
  user : null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SIGN_UP:
      return Object.assign({}, state, {
        isRegister: false,
        isLoading: true,
        registerError: null,
        user : null,
      });
    case types.SIGN_UP_SUCCESS:
      return Object.assign({}, state, {
        isRegister: true,
        isLoading: false,
        registerError: null,
        user : action.user,
      });
    case types.SIGN_UP_FAILURE:
      return Object.assign({}, state, {
        isRegister: false,
        isLoading: false,
        registerError: action.error,
        user : null,
      });
    default:
      return state;
  }
};
