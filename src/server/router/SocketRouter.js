import config_be from './../../../etc/config-be';

import service from './../service';

import { makeServiceRunner } from './../core/serviceRuner'
import Req from './../core/request';
import Res from './../core/respons';
import contextBuilder from '../utils/contextBuilder'

export default function initRouter(socket) {
  const req = new Req(socket);
  //const res = new Res({ connectionType: 'singleRequest', socket });
  socket.on('action', (action) => {

    switch (action.type) {
      case 'ping':
        socket.emit('action', {type: 'pong'});
        break;
      case 'init':
        socket.emit('action', {
          type: 'init',
          body: randomTable()
        })
        break;
      case 'setName':
        socket.to(socket.id).emit('action', {type: 'ping'});
        break;
      default :
        socket.to(socket.id).emit('action', {type: 'ping'});
        break;
    }
  });

  socket.on('userCreate', async ({password, name }) => {
    const res = new Res({ connectionType: 'singleRequest', socket });

    makeServiceRunner(service.Session.Create,
      { password, name },
      {name, socket}
      )({ res, req });
  });

  socket.on('userCheck', async ({password, name }) => {
    const res = new Res({ connectionType: 'singleRequest', socket });

    makeServiceRunner(service.Session.Update,
      { password, name },
      {name, socket}
    )({ res, req });
  });

  socket.on('roomCreate', async ({ userUuid, name }) => {
    const res = new Res({ connectionType: 'singleRequest', socket });
    makeServiceRunner(service.Room.Create,
      { name },
      await contextBuilder({ userUuid })
      )({ res, req });
  });

  socket.on('roomList', async () => {
    const res = new Res({ connectionType: 'singleRequest', socket });
    makeServiceRunner(service.Room.List,
      {},
      {}
    )({ res, req });
  });

  socket.on('initSession', async ({userName, userUuid }) => {
    const res = new Res({ connectionType: 'singleRequest', socket });

    makeServiceRunner(service.Session.Show,
      { userName, userUuid },
      {userUuid, socket}
    )({ res, req });
  });

  socket.on('subscribeOnRoom', async ({ roomId, playerId }) => {
    const res = new Res({ connectionType: 'singleRequest', socket });

    makeServiceRunner(service.Room.Update,
      { roomId, playerId },
      await contextBuilder({ userUuid: playerId })
    )({ res, req });
  });
}



const randomTable = () => {

  const y = config_be.bordParam.width;
  const x = config_be.bordParam.height;
  let board = [];
  for (let i =0; i < x; i++) {
    let tmpY = [];
    for (let j = 0; j < y; j++) {
      tmpY.push(getRandomInt(5));
    }
    board.push(tmpY);
  }

  return {
    array: board,
    width: y,
    height:x
  };

};


const generate = (n) => {
  const ar = [];
  for (let i = 0; i < n; i++) {
    ar.push(getRandomInt(3))
  }
  return ar;
};


const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));
