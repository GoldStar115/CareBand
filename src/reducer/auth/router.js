import * as types from "../../actions/auth/type";
const initialState = {
  isAuthRouter: false,
  isLoading: false,
  authRouterError: null,
  user : null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.AUTHENTICATE:
      return Object.assign({}, state, {
        isAuthRouter: false,
        isLoading: true,
        authRouterError: null,
        user : null
      });
    case types.AUTHENTICATE_SUCCESS:
      return Object.assign({}, state, {
        isAuthRouter: true,
        isLoading: false,
        authRouterError: null,
        user : action.user
      });
    case types.AUTHENTICATE_FAILURE:
      return Object.assign({}, state, {
        isAuthRouter: false,
        isLoading: false,
        authRouterError: action.error,
        user : null
      });
    case types.LOG_OUT: {
      return Object.assign({}, state, {
        isAuthRouter: false,
        isLoading: true,
        authRouterError: null,
        user : null
      });
    }
    case types.LOG_OUT_SUCCESS: {
      return Object.assign({}, state, {
        isAuthRouter: false,
        isLoading: false,
        authRouterError: null,
        user : null
      });
    }
    default:
      return state;
  }
};
