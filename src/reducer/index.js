import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import createLogger from "redux-logger";

import tabReducer from './tab/index'

import logInReducer from "./auth/login";
import registerReducer from "./auth/register";
import confirmReducer from "./auth/confirm";
import forgotPassReducer from "./auth/forgot";
import resetPassReducer from "./auth/reset";
import routerReducer from "./auth/router";
import patientReducer from "./cloud/patient";
import patientInfoReducer from "./cloud/patientInfo";
import getUserReducer from "./user/getUser";
import updateUserReducer from "./user/updateUser";
import notificationReducer from "./cloud/notification";
import locationReducer from "./cloud/location";


const Reducer = combineReducers({
  logInReducer,
  registerReducer,
  confirmReducer,
  forgotPassReducer,
  resetPassReducer,
  routerReducer,
  getUserReducer,
  updateUserReducer,
  patientReducer,
  patientInfoReducer,
  notificationReducer, 
  locationReducer, 
  tabReducer  
});
const rootReducer = (state, action) => {
  return Reducer(state, action);
};

const logger = createLogger();

let store = createStore(rootReducer, compose(applyMiddleware(thunk)));

export default store;
