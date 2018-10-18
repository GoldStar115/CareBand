import * as types from "../../actions/could/type";
const initialState = {
  isGetNotification: false,
  isLoading: false,
  getNotificationError: null,
  notifications: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_NOTIFICATION:
      return Object.assign({}, state, {
        isGetNotification: false,
        isLoading: true,
        getNotificationError: null,
        notifications: null
      });
    case types.UPDATE_NOTIFICATION:
      return Object.assign({}, state, {
        isGetNotification: false,
        isLoading: false,
        getNotificationError: null,
        notifications: null
      });
    case types.GET_NOTIFICATION_SUCCESS:
      return Object.assign({}, state, {
        isGetNotification: true,
        isLoading: false,
        getNotificationError: null,
        notifications: action.notifications
      });
    case types.GET_NOTIFICATION_FAILURE:
      return Object.assign({}, state, {
        isGetNotification: false,
        isLoading: false,
        getNotificationError: action.error,
        notifications: null
      });

    default:
      return state;
  }
};
