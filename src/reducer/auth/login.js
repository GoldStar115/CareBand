import * as types from "../../actions/auth/type";
const initialState = {
  isLogin: false,
  isLoading: false,
  loginError: null,
  user : null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOG_IN:
      return Object.assign({}, state, {
        isLogin: false,
        isLoading: true,
        loginError: null,
        user : null
      });
    case types.LOG_IN_SUCCESS:
      return Object.assign({}, state, {
        isLogin: true,
        isLoading: false,
        loginError: null,
        user : action.user
      });
    case types.LOG_IN_FAILURE:
      return Object.assign({}, state, {
        isLogin: false,
        isLoading: false,
        loginError: action.error,
        user : null
      });
    default:
      return state;
  }
};
