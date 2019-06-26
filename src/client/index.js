import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux';
import { init } from './actions/init'

import Router from './utils/router';

import socket from './utils/socket';
import store from './utils/store';
import Popup from './components/Popup';
import ErrorPopup from './components/ErrorPopup';
import { getUserState } from './utils/cookie';

socket.emit('action', { type: 'init'} );
socket.emit('roomList', {} );
socket.emit('initSession', getUserState());

const arrowPres = (e) => {
};

const app = document.getElementById('tetris');

ReactDom.render((
  <Provider store={store}>
    <Router onKeyPress={arrowPres}/>
    <Popup/>
    <ErrorPopup/>
  </Provider>
), app);



