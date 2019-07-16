import Base from  './../Base'
import Game from './../../model/Game';
import Player from './../../model/Player';

import socket from './../../core/socket';

import uuidv4 from 'uuid/v4';
import { eventEmitter } from '../../router/EventRouter';

import container from './../../core/gameContainer';

export default class Create extends Base {
  validateRules = ['roomId'];

  async execute({ roomId }) {
    const { user } = this.context;
    if (!user) {
      this.throwError({ field: 'User', message: 'Yoops, you need login first' });
    }

    const game = await Game.findOne({
      roomId,
    });

    if (!game) {
      this.throwError({ field: 'Game', message: 'Yoops, no such game' });
    }

    const players = await Player.find({
      playerId: game.playerIds,
    });

    const ids = [];

    players.map(player => {
      const conection = socket.io.sockets.connected[player.socketId];
      if (conection) {
        conection.join(game.roomId);
        ids.push(player.playerId);
      } else {
        console.log('NO CONECTION');
      }
      player.status = 'IN GAME';
      player.save();
    });

    const startedGame = await game.InitGame(ids);
    console.log('==============================================')
    const cont = await container;

    cont.push(startedGame.getValue());

    return {
      Status: 1,
      type: 'gameStart',
      gameId: game.roomId,
      gameData: game.getValue(),
    };
  }
}
