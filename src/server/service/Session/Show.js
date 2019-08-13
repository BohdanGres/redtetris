import Base from  './../Base'
import Player from './../../model/Player';
import Game from './../../model/Game';
import socket from './../../core/socket';

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
        type: 'noResponse',
      };
    }

    user.socketId = this.context.socketId;
    await user.save();

    const runningGame = await Game.findOne({
      playerIds: user.playerId
    });

    if (runningGame) {
      const connection = socket.io.sockets.connected[user.socketId];
      if (connection) {
        connection.join(runningGame.roomId);
      }
    }
    return {
      Status: 1,
      type: 'sessionInit',
      roomPending: runningGame ? runningGame.getValue() : null,
    }
  }
}
