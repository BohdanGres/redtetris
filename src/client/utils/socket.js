import openSocket from 'socket.io-client';
import { init } from '../actions/init';
import { error } from '../actions/error';
import { setCookie } from './cookie';
import { auth } from '../actions/auth';
import { roomListUpdate } from "../actions/roomListUpdate";
import { roomCreate } from "../actions/roomCreate";
import { sessionInit } from "../actions/sessionInit";

import store from './store';
const socket = openSocket('http://localhost:3004');

socket.on('action', (data) => {
  console.log('from socket nodejs',  data);
  switch (data.type) {
    case 'init':
      store.dispatch(init(data.body));
      break;
    case 'errorPopup':
      store.dispatch(error(data.error));
      break;
    case 'userCreate':
      setCookie('uuid', data.uuid, 1);
      setCookie('userName', data.name, 10);
      store.dispatch(auth({ userUuid: data.uuid, userName:  data.name, userType: 'LOGED', loginPopup: false }));
      break;
    case 'listRoomUpdate':
      store.dispatch(roomListUpdate(data.roomList));
      break;
    case 'roomCreate':
      store.dispatch(roomCreate(data.game));
      break;
    case 'sessionInit':
      store.dispatch(sessionInit(data.roomPending));
  }
});

socket.on('RESPONS', data => {
  console.log('GET RESPONSE', data)
});

export default socket;
