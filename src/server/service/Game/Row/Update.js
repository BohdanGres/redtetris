import Base from './../../Base'
import Game from './../../../model/Game';

export default class Update extends Base {
  validateRules = ['blockedRoom', 'playerId', 'roomId'];

  async execute({ blockedRoom, playerId, roomId }) {
    const game = await Game.findOne({
      roomId,
    });

    if (!game) {
      this.throwError({ field: 'Game', message: 'Yoops, such game dont exis' });
    }

    const tables = game.tables;

    for (const user in tables) {
      let blocked = 0;
      tables[user].table.forEach(tr => {
        blocked += tr.every(e => e === 6);
      })
      if (user !== playerId) {
        for (let i = 0; i < blockedRoom; i++) {
          tables[user].table[19 - i - blocked] = [6, 6, 6, 6, 6, 6, 6, 6, 6, 6];
        }
      }
    }

    game.tables = { ...tables };
    game.markModified('tables');
    await game.save();

    return {
      Status: 1,
      type: 'gameUpdateRow',
      gameId: game.roomId,
      gameData: {
        updatedBy: playerId,
        tables: game.tables
      },
    };
  }
}
