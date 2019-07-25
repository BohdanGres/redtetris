import config_be from './../../../etc/config-be';

import service from './../service';

import { makeServiceRunner } from './../core/serviceRuner'
import Req from './../core/request';
import Res from './../core/respons';
import contextBuilder from '../utils/contextBuilder'
import container from './../core/gameContainer'

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
          body: [],
        });
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
      { name, socketId: socket.id }
      )({ res, req });
  });

  socket.on('userCheck', async ({password, name }) => {
    const res = new Res({ connectionType: 'singleRequest', socket });
    makeServiceRunner(service.Session.Update,
      { password, name },
      { name, socketId: socket.id }
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
      {userUuid, socketId: socket.id }
    )({ res, req });
  });

  socket.on('subscribeOnRoom', async ({ roomId, playerId }) => {
    const res = new Res({ connectionType: 'singleRequest', socket });

    makeServiceRunner(service.Room.Update,
      { roomId, playerId },
      await contextBuilder({ userUuid: playerId })
    )({ res, req });
  });

  socket.on('disconnect',async () => {
    const res = new Res({ connectionType: 'noRequest', socket });

    makeServiceRunner(service.Session.Delete,
      { socketId: socket.id },
      {}
    )({ res, req });
  });

  socket.on('gameStart', async ({ roomId, playerId }) => {
    const res = new Res({ connectionType: 'roomRequest', socket });

    makeServiceRunner(service.Game.Create,
      { roomId },
      await contextBuilder({ userUuid: playerId })
    )({ res, req });
  });
  socket.on('setFigure', async ({ x, y, figure, playerId, roomId }) => {

    console.log('====================================');
    console.log('SET FIGURE PRISHLO');
    console.log('====================================')


    const res = new Res({ connectionType: 'roomRequest', socket });
    const game = container.getGame(roomId);
    if (!game) {
      return;
    }

    const step = makeServiceRunner(service.Game.Update,
      { x, y, figure, roomId },
      await contextBuilder({ userUuid: playerId })
    );
    game.push(step.bind(step, ({ res, req })));

  });

}
