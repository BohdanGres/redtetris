import Base from  './../../Base'
import Game from './../../../model/Game';
import Player from './../../../model/Player';

export default class Create extends Base {
  validateRules = ['name', 'playerId'];

  async execute({ name, playerId }) {
    const user = await Player.findOne({ playerId });
    if (!user) {
      return { type: 'NO_USER' };
    }

    const game = await Game.findOne({
      roomName: name,
    });

    if (!game) {
     return { type: 'CREATE' };
    }

    return { type: 'SUBSCRIBE', roomId: game.roomId };
  }
}
