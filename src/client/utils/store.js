import cookie from "./cookie";
import configUi from "../../../etc/config-ui";
import {applyMiddleware, createStore} from "redux";
import reducer from "../reducers";
import thunk from "redux-thunk";
import createLogger from "redux-logger";

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

const initialState = {
  ...geUserStatus(),
  array: [],
  page: 'home',
  width: configUi.COLUMN,
  height: configUi.ROW,
  error: null,
  roomPending: null,
  roomList: [],
};

export  { initialState };

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunk, createLogger())
);

export default store;
