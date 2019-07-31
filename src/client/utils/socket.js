import openSocket from 'socket.io-client';
import { init } from '../actions/init';
import { error } from '../actions/error';
import {getUserState, setCookie} from './cookie';
import { auth } from '../actions/auth';
import { roomListUpdate } from "../actions/roomListUpdate";
import { roomCreate } from "../actions/roomCreate";
import { sessionInit } from "../actions/sessionInit";
import {gameStart, x, gameUpdate, blockRow, gameEnd, block } from '../actions/gameAction';
import { users } from '../actions/user';

import store, {getInitialState} from './store';
import { clearStore, clearStoreSoft} from "../actions/clearStore";
const socket = openSocket('http://localhost:3004');

socket.on('connection', () => {
  socket.emit('roomList', {} );
  socket.emit('userList', {});

});


socket.on('reconnect', () => {
  socket.emit('initSession', getUserState());
});

socket.on('connect', () => {
  socket.emit('initSession', getUserState());
  socket.emit('roomList', {} );
  socket.emit('userList', {});
});

socket.on('action', (data) => {
  console.log('socet data', data)
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
      break;
    case 'gameStart':
      store.dispatch(gameStart(data.gameData));
      break;
    case 'gameUpdate':
      store.dispatch(gameUpdate(data.gameData));
      break;
    case 'goDown':
      window.dispatchEvent(new KeyboardEvent('keydown',{'key':'ArrowDown'}));
      // store.dispatch(x(1));
      break;
    case 'gameUpdateRow':
      store.dispatch(block());
      store.dispatch(blockRow(data.gameData));
      break;
    case 'listUser':
      store.dispatch(users(data.userList));
      break;
    case 'roomSubscribe':
      store.dispatch(roomCreate(data.game));
      break;
    case 'gameWiner':
      store.dispatch(gameEnd(data.name));
      break;
    case 'reset':
      store.dispatch(clearStoreSoft(getInitialState()));
      break;
  }
});

socket.on('RESPONS', data => {
});

export default socket;
