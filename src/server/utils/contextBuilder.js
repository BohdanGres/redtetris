import Player from './../model/Player';
import uuidv4 from 'uuid/v4';

const contextBuilder = async ({ userUuid }) => {

  const player = await Player.findOne({ playerId: userUuid});

  return { user: player, socketId: player ? player.socketId : '' };
};

export default contextBuilder;
