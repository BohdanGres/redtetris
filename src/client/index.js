import React from 'react'
import ReactDom from 'react-dom'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import {storeStateMiddleWare} from './middleware/storeStateMiddleWare'
import reducer from './reducers'
import App from './containers/app'
import {alert} from './actions/alert'
import {init} from './actions/init'


import configUi from '../../etc/config-ui';



import openSocket from 'socket.io-client';





const initialState = {
  array: [],
  width: configUi.COLUMN,
  height:configUi.ROW
};



const store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunk, createLogger())
);

const socket = openSocket('http://localhost:3004');

socket.on('action', (data) => {
 //console.log('from socket nodejs',  data);
  if (data.type == 'init') {
    //console.log('asdsadsadasdsads');
    store.dispatch(init(data.body))
  }
});


socket.emit('action', { type: 'init'} );

// for (let i = 0; i < 10; i++) {
//   socket.emit('action', { type: (i%2 == 0) ? 'ping' : 'pong'} );
// }



const arrowPres = (e) => {
  console.log(121);
  /*  if (e.keyCode == '38') {
      // up arrow
    }
    else if (e.keyCode == '40') {
      // down arrow
    }
    else if (e.keyCode == '37') {
      // left arrow
    }
    else if (e.keyCode == '39') {
      // right arrow
    }*/
  console.log(e.keyCode());
};



const app = document.getElementById('tetris');

ReactDom.render((
  <Provider store={store}>
    <App onKeyDown={arrowPres}/>
  </Provider>
), app)

// store.dispatch(alert('Soon, will be here a fantastic Tetris ...'))



setInterval(() => {socket.emit('action', { type: 'init'} )}, 10000)

/*

const f = () {}
socket.emit('action', { type: 'init'} );
*/



