import Base from  './../Base'
import Player from './../../model/Player';
import Game from './../../model/Game';
import uuidv4 from 'uuid/v4';

export default class Delete extends Base {
  validateRules = [ 'socketId' ];

  async execute({ socketId }) {
    await Player.updateOne(
      {
        socketId,
      },
      {
        socketId: '',
      }
    );

    return {
      Status: 1,
    }
  }
}
