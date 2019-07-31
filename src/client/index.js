import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux';
import Router from './utils/router';
import store from './utils/store';
import Popup from './components/Popup';
import ErrorPopup from './components/ErrorPopup';
import WinerPopup from './components/WinerPopup';

import eventInit from './utils/eventListener';
import parseUrl from './utils/urlParse';
// socket.emit('action', { type: 'init'} );
// socket.emit('roomList', {} );
// socket.emit('initSession', getUserState());

eventInit();
parseUrl();

const app = document.getElementById('tetris');

ReactDom.render((
  <Provider store={store}>
    <Router/>
    <Popup/>
    <ErrorPopup/>
    <WinerPopup/>
  </Provider>
), app);



