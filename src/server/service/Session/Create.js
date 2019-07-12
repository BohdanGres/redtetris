import Base from  './../Base'
import Player from './../../model/Player';
import uuidv4 from 'uuid/v4';

export default class Create extends Base {
  validateRules = ['name', 'password'];

  async execute({ name, password }) {

   let user = await Player.findOne({
     name,
   });

    if (!user) {
      user = await Player.create({
        name,
        playerId: uuidv4(),
        password,
        socketId: this.context.socketId,
      });

      return {
        Status: 1,
        type: 'userCreate',
        uuid: user.playerId,
        name: user.name,
      };
    }

    const passCheck = password === user.password;
    if (!passCheck) {
      const error = new Error('Yoops, such user already exist ;)');
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
