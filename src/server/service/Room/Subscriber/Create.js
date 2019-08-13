import Base from  './../../Base'
import Game from './../../../model/Game';
import uuidv4 from 'uuid/v4';
import eventEmitter  from '../../../router/EventRouter';

export default class Create extends Base {
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

    if (game.playerIds.length === 5 || game.playerIds.indexOf(playerId) > -1) {
      this.throwError({ field: '?????', message: 'Yoops, WTF!!?!?!?!??!!?!?' });
    }

    game.playerIds.push(user.playerId);
    game.playerNames.push(user.name);
    await game.save();

    eventEmitter.emit('serverEvent', { event: 'roomListUpdate', data: {} });

    return {
      Status: 1,
      type: 'roomSubscribe',
      game: game.getValue(),
    };
  }
}
