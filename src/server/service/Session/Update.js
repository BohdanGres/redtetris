import Base from  './../Base'
import Player from './../../model/Player';
import uuidv4 from 'uuid/v4';

export default class Update extends Base {
  validateRules = ['name', 'password'];

  async execute({ name, password }) {

    let user = await Player.findOne({
      name,
    });

    if (!user) {
      const error = new Error('Yoops, something go wrong');
      error.field = 'User';
      throw error;
    }

    const passCheck = password === user.password;
    if (!passCheck) {
      const error = new Error('Yoops, wrong pass');
      error.field = 'User';
      throw error;
    }
    user.socketId = this.context.socketId;
    user.save();
    return {
      Status: 1,
      type: 'userCreate',
      uuid: user.playerId,
      name: user.name
    };
  }
}
