import * as types from "../../actions/tab/type";
const initialState = {
  isSwitchNotification: true,
  isSwitchResident: false,
  isSwitchLocation: false,
  userId : null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SWITCH_NOTIFICATION:
      return Object.assign({}, state, {
        isSwitchNotification: true,
        isSwitchResident: false,
        isSwitchLocation: false,
        userId : null
      });
    case types.SWITCH_RESIDENT:
      return Object.assign({}, state, {
        isSwitchNotification: false,
        isSwitchResident: true,
        isSwitchLocation: false,
        userId : null
      });
    case types.SWITCH_LOCATION:
      return Object.assign({}, state, {
        isSwitchNotification: false,
        isSwitchResident: false,
        isSwitchLocation: true,
        userId : action.userId
      });
    default:
      return state;
  }
};
