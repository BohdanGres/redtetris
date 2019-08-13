import Base from  './../Base'
import Player from './../../model/Player';

export default class List extends Base {

  validateRules = [];

  async execute() {
    const list = await Player.find({});
    return {
      Status: 1,
      type: 'listUser',
      userList: list.map(u => ({ name: u.name, score: u.score })),
    };
  }
}
