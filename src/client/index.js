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






import openSocket from 'socket.io-client';





const initialState = {
  array: [],
  width: 10,
  height:10
};



const store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunk, createLogger())
);

const socket = openSocket('http://localhost:3004');

socket.on('action', (data) => {
  console.log('from socket nodejs',  data);
  if (data.type == 'init') {
    console.log('asdsadsadasdsads');
    store.dispatch(init(data.body))
  }
});


socket.emit('action', { type: 'init'} );

// for (let i = 0; i < 10; i++) {
//   socket.emit('action', { type: (i%2 == 0) ? 'ping' : 'pong'} );
// }


const app = document.getElementById('tetris');

ReactDom.render((
  <Provider store={store}>
    <App/>
  </Provider>
), app)

// store.dispatch(alert('Soon, will be here a fantastic Tetris ...'))



setInterval(() => {socket.emit('action', { type: 'init'} )}, 200)

/*

const f = () {}
socket.emit('action', { type: 'init'} );
*/


