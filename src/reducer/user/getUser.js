import * as types from "../../actions/user/type";
const initialState = {
  isGetUser: false,
  isLoading: true,
  getUserError: null,
  user : null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CUR_USER:
      return Object.assign({}, state, {
        isGetUser: false,
        isLoading: true,
        getUserError: null,
        user : null
      });
    case types.GET_CUR_USER_SUCCESS:
      return Object.assign({}, state, {
        isGetUser: true,
        isLoading: false,
        getUserError: null,
        user : action.user
      });
    case types.GET_CUR_USER_FAILURE:
      return Object.assign({}, state, {
        isGetUser: false,
        isLoading: false,
        getUserError: action.error,
        user : null
      });
    default:
      return state;
  }
};
