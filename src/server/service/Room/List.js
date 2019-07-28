import Base from  './../Base'
import Game from './../../model/Game';

export default class List extends Base {

  validateRules = [];

  async execute() {
    const list = await Game.find({ status : 'pending' });
    return {
      Status: 1,
      type: 'listRoomUpdate',
      roomList: list.map(g => g.getValue()),
    };
  }
}
