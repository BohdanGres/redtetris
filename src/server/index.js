import debug from 'debug';
import initRouter from './router/SocketRouter';
import initRequestRouter from './router/RequestRouter';
import mongoose from 'mongoose';
import socket from './core/socket';
import { iniEventRouter } from './router/EventRouter';
import container from './core/gameContainer';

import Piece from './model/Piece';
const logerror = debug('tetris:error'),
  loginfo = debug('tetris:info');


// mongoose.Promise = Promise;
mongoose.connect(`mongodb://localhost/mongo42`);

const initApp = (app, params, cb) => {
  const { host, port } = params;

  app.on('request', initRequestRouter);

  app.listen({ host, port }, () =>{
    loginfo(`tetris listen on ${params.url}`)
    cb()
  })
};

const initEngine = io => {
  io.on('connection', initRouter);
  iniEventRouter();
};

export function create(params) {
  const promise = new Promise( (resolve, reject) => {
    const app = require('http').createServer()
    initApp(app, params, () =>{

      const io = new require('socket.io')(app);
      socket.init(app);
      console.log(new Date());
      const stop = (cb) => {
        app.close( () => {
          app.unref()
        })
        loginfo(`Engine stopped.`)
        cb()
      };

      initEngine(socket);

      resolve({ stop });
    })
  });
  return promise
}
