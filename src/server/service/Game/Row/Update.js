import Base from './../../Base'
import Game from './../../../model/Game';

export default class Update extends Base {
  validateRules = ['blockedRoom', 'playerId', 'roomId'];

  async execute({ blockedRoom, playerId, roomId }) {
    console.log('FIND GAME IN ROW START', new Date());
    const game = await Game.findOne({
      roomId,
    });
    console.log('FIND GAME IN ROW END', new Date());

    if (!game) {
      this.throwError({ field: 'Game', message: 'Yoops, such game dont exis' });
    }

    const tables = game.tables;

    for (const user in tables) {
      if (user !== playerId) {
        for (let i = 0; i < blockedRoom; i++) {
          let blocked = 0;
          tables[user].table.forEach(tr => {
            blocked += tr.every(e => e === 6);
          })
          tables[user].table[19 - i - blocked] = [6, 6, 6, 6, 6, 6, 6, 6, 6, 6];
        }
      }
    }

    game.tables = JSON.parse(JSON.stringify({ ...tables })) ;
    console.log('GAME AT ROW SAVE START ',JSON.stringify(game));
    game.markModified('tables');
    await game.save();
    console.log('GAME AT ROW SAVE END ', JSON.stringify(game));

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
