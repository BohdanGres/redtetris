import debug from 'debug';
import initRouter from './router/SocketRouter';
import initRequestRouter from './router/RequestRouter';
import mongoose from 'mongoose';
import socket from './core/socket';
import { iniEventRouter } from './router/EventRouter';
import container from './core/gameContainer';
import http from 'http';
import socketClient from 'socket.io';

import Piece from './model/Piece';
const logerror = debug('tetris:error'),
  loginfo = debug('tetris:info');


// mongoose.Promise = Promise;
const dbName = process.env.MODE === 'test' ? 'testDb' : 'mongo42';
mongoose.connect(`mongodb://localhost/${dbName}`);

iniEventRouter();

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
};

export function create(params) {
  const promise = new Promise( (resolve, reject) => {
    const app = http.createServer()
    initApp(app, params, () =>{

      const io = new socketClient(app);
      socket.init(app);
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


export function droppDatabase() {
  mongoose.connection.db.dropDatabase();
}
