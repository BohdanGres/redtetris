import cookie from "./cookie";
import configUi from "../../../etc/config-ui";
import {applyMiddleware, createStore, compose} from "redux";
import reducer from "../reducers/index";
import thunk from "redux-thunk";
import createLogger from "redux-logger";
import thunkMiddleware                           from 'redux-thunk';

const geUserStatus = () => {
  let type = 'LOGED';
  let loginPopup = false;
  const userUuid = cookie.getCookie('uuid');
  const userName = cookie.getCookie('userName');
  if (!userUuid && !userName) {
    type = 'NEW_USER';
    loginPopup = true;
  }
  if (!userUuid && userName) {
    type = 'OLD_USER';
    loginPopup = true;
  }

  return { userUuid, userName, userType: type, loginPopup };
};

export const getInitialState = () => ({
  ...geUserStatus(),
  array: [],
  page: 'home',
  i: 0,
  width: configUi.COLUMN,
  height: configUi.ROW,
  error: null,
  roomPending: null,
  roomList: [],
  blockDown: false,
  users: [],
  winerName: null
});


const composeEnhancers = process.env.NODE_ENV !== 'production' ?
 compose: // eslint-disable-line
  compose;


const store = createStore(
  reducer,
  getInitialState(),
  composeEnhancers(
    applyMiddleware(thunkMiddleware)
  ));

export default store;
