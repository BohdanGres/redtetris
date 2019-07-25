import Base from  './../Base'
import Game from './../../model/Game';
import uuidv4 from 'uuid/v4';
import eventEmitter  from '../../router/EventRouter';

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

    if (game.playerIds.length === 5 || game.playerIds.indexOf(playerId) > -1) {
      this.throwError({ field: '?????', message: 'Yoops, WTF!!?!?!?!??!!?!?' });
    }

    game.playerIds.push(user.playerId);
    game.playerNames.push(user.name);
    await game.save();

    //
    // if (game) {
    //   this.throwError({ field: 'Game', message: 'Yoops, such game already exis' });
    // }
    // const newGame = await Game.create({
    //   roomId : uuidv4(),
    //   roomName : name,
    //   playerIds : [user.playerId],
    //   playerNames : [user.name],
    //   createdBy : user.playerId,
    // });
    //
    // if (!newGame) {
    //   this.throwError({ field: 'Game', message: 'Yoops, WTF!!!!' });
    // }
    //
    eventEmitter.emit('serverEvent', { event: 'roomListUpdate', data: {} });

    return {
      Status: 1,
      type: 'tst',
    };
  }
}
