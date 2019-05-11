import fs  from 'fs'
import debug from 'debug'

import initRouter from './router/SocketRouter';

import mongoose from 'mongoose';

const logerror = debug('tetris:error'),
  loginfo = debug('tetris:info');

mongoose.Promise = Promise;
mongoose.connect(`mongodb://localhost/mongo42`);

import Game from './model/Game';





const initApp = (app, params, cb) => {
  const { host, port } = params;
  const handler = (req, res) => {

    // if (req.url == 'test')
    console.log(req.url);
    const file = req.url === '/bundle.js' ? '/../../build/bundle.js' : '/../../index.html'
    fs.readFile(__dirname + file, (err, data) => {
      if (err) {
        logerror(err)
        res.writeHead(500)
        return res.end('Error loading index.html')
      }
      res.writeHead(200)
      res.end(data)
    })
  }

  app.on('request', handler)

  app.listen({host, port}, () =>{
    loginfo(`tetris listen on ${params.url}`)
    cb()
  })
}

const initEngine = io => {
  io.on('connection', function(socket){
    console.log("Socket connected: " + socket.id)
    initRouter(socket);
  })
}

export function create(params){

  let g = new Game({
    roomId: 1,
    playerIds: [1,2,3,4,5]
  });
  g.save();
  console.log(g);
  const promise = new Promise( (resolve, reject) => {
    const app = require('http').createServer()
    initApp(app, params, () =>{
      const io = require('socket.io')(app)
      const stop = (cb) => {
        io.close()
        app.close( () => {
          app.unref()
        })
        loginfo(`Engine stopped.`)
        cb()
      }

      initEngine(io);
      resolve({stop})
    })
  })
  return promise
}
