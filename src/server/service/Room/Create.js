import Base from  './../Base'
import Game from './../../model/Game';
import uuidv4 from 'uuid/v4';
import eventEmitter from '../../router/EventRouter';

export default class Create extends Base {
  validateRules = ['name'];

  async execute({ name }) {
    const { user } = this.context;
    if (!user) {
      this.throwError({ field: 'User', message: 'Yoops, you need login first' });
    }

    const game = await Game.findOne({
      roomName: name,
    });

    if (game) {
      this.throwError({ field: 'Game', message: 'Yoops, such game already exis' });
    }
    const newGame = await Game.create({
      roomId : uuidv4(),
      roomName : name,
      playerIds : [user.playerId],
      playerNames : [user.name],
      createdBy : user.playerId,
      status :   'pending',
    });

    // if (!newGame) {
    //   this.throwError({ field: 'Game', message: 'Yoops, WTF!!!!' });
    // }

   eventEmitter.emit('serverEvent', { event: 'roomListUpdate', data: {} });

    return {
      Status: 1,
      type: 'roomCreate',
      game: newGame.getValue(),
    };
  }
}
