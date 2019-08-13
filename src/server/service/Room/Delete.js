import Base from  './../Base'
import Game from './../../model/Game';
import Player from './../../model/Player';
import uuidv4 from 'uuid/v4';
import eventEmitter  from '../../router/EventRouter';
import socket from './../../core/socket';

export default class Update extends Base {
  validateRules = ['roomId', 'playerId'];

  async execute({ roomId, playerId }) {
    const { user } = this.context;
    if (!user) {
      this.throwError({ field: 'User', message: 'Yoops, you need login first' });
    }

    const game = await Game.findOne({
      roomId,
    });

    if (!game || game.createdBy !== playerId) {
      this.throwError({ field: 'User', message: 'Yoops, WTF!' });
    }

    const otherPlayer = game.playerIds.filter(id => id !== user.playerId);
    const users = await Player.find({
      playerId: otherPlayer
    });
    console.log(users);
    users.forEach(user => {
      socket.emit('action', { type: 'reset' }, user.socketId);
    });
    await game.remove();

    eventEmitter.emit('serverEvent', { event: 'roomListUpdate', data: {} });

    return {
      Status: 1,
      type: 'reset',
      game: game.getValue(),
    };
  }
}
