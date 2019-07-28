import Base from  './../../Base'
import Game from './../../../model/Game';
import socket from './../../../core/socket';
import eventEmitter from "../../../router/EventRouter";

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

    if (!game || game.createdBy === playerId) {
      this.throwError({ field: 'User', message: 'Yoops, WTF!' });
    }


    game.playerIds = game.playerIds.filter(id => id !== user.playerId);
    game.playerNames = game.playerNames.filter(name => name !== user.name);
    game.markModified('playerIds');
    game.markModified('playerNames');
    await game.save();
    socket.removePlayerFromRoom(user.socketId, game.name);
    eventEmitter.emit('serverEvent', { event: 'roomListUpdate', data: {} });


    return {
      Status: 1,
      type: 'reset',
    };
  }
}
