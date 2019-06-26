import Base from  './../Base'
import Player from './../../model/Player';
import Game from './../../model/Game';
import uuidv4 from 'uuid/v4';

export default class Show extends Base {
  validateRules = ['userName', 'userUuid'];

  async execute({userName, userUuid}) {
    const user = await Player.findOne({
      name: userName,
      playerId: userUuid,
    });

    if (!user) {
      return {
        Status: 1,
        type: 'norRespons',
      };
    }

    const game = await Game.findOne({
      createdBy: userUuid,
    });

    return {
      Status: 1,
      type: 'sessionInit',
      roomPending:game
    }
  }
}
