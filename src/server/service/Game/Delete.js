import Base from  './../Base'
import Game from './../../model/Game';
import Player from './../../model/Player';

import container from './../../core/gameContainer';
import socket from './../../core/socket';
import eventEmitter from "../../router/EventRouter";

export default class Delete extends Base {
  validateRules = [ 'roomId' ];

  async execute({ roomId }) {
    const game = await Game.findOne({
      roomId,
    });

    if (!game) {
      this.throwError({ field: 'Game', message: 'Yoops, such game already exis' });
    }
    const winers = [];
    let l = 0;
    for ( let id in game.tables ) {
      l++;
      if (!game.tables[id].isEnd) winers.push(id);
    }

    if (l === 1) {
      const user = await Player.findOne({
        playerId : winers[0]
      });
      if (!user) {
        this.throwError({ field: 'User', message: 'Yoops, no such user' });
      }

      const gameManager = container.getGame(game.roomId);
      gameManager.stopGame();
      socket.sendToRoom(game.roomId, { type: 'gameWiner', name: 'Not you' });
      socket.clearRoom(game.roomId)
      container.clearContainer();
      game.status = 'pending';
      game.tables = {};
      await game.save();
      return {
        Status: 1,
        type: 'gameEnd',
        gameId: game.roomId,
        winer: user,
      };
    }

    if (winers.length === 1) {
      const user = await Player.findOne({
        playerId : winers[0]
      });
      if (!user) {
        this.throwError({ field: 'User', message: 'Yoops, no such user' });
      }

      user.score += 1;
      await user.save();
      const gameManager = container.getGame(game.roomId);
      gameManager.stopGame();
      socket.sendToRoom(game.roomId, { type: 'gameWiner', name: user.name });
      socket.clearRoom(game.roomId)
      container.clearContainer();
      game.status = 'pending';
      game.tables = {};
      await game.save();
      console.log('user', user);
      return {
        Status: 1,
        type: 'gameEnd',
        gameId: game.roomId,
        winer: user,
      };
    }

    return {
      Status: 1,
      type: 'reset',
      gameId: game.roomId,
      gameData: { ...game.getValue(), updatedBy: user.playerId },
    };
  }
}
