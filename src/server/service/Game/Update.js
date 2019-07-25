import Base from  './../Base'
import Game from './../../model/Game';
// import Player from './../../model/Player';
import  eventEmitter  from '../../router/EventRouter';

const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

export default class Update extends Base {
  validateRules = ['x', 'y', 'figure', 'roomId'];

  async execute({ x, y, figure, roomId }) {
    const { user } = this.context;
    if (!user) {
      this.throwError({ field: 'User', message: 'Yoops, you need login first' });
    }
    console.log('GAME START FIND IN UPDATE', new Date());
    const game = await Game.findOne({
      roomId,
    });
    console.log('GAME END FIND IN UPDATE', JSON.stringify(game));

    if (!game) {
      this.throwError({ field: 'Game', message: 'Yoops, such game already exis' });
    }
    const userTable = game.tables[user.playerId];
    if (userTable.isEnd) {
      this.throwError({ field: 'User', message: 'Yoops, you looser' });
    }

    let isEnd = false;
    figure.forEach( (row, i) => {
      row.forEach((col, j) => {
        if (userTable.table[x + i][y + j] && col) {
          isEnd = true;
        }
        userTable.table[x + i][y + j] = col ? col : userTable.table[x + i][y + j];
      });
    });

    if (isEnd) {
      game.tables[user.playerId].isEnd = true;
      game.markModified('tables');
      await game.save();
      return {
        Status: 1,
        type: 'gameUpdate',
        gameId: game.roomId,
        gameData: { ...game.getValue(), updatedBy: user.playerId },
      };
    }
    userTable.step += 1;

    const current = game.getCurent(userTable.step);
    let rowEmpted = 0;
    let newTable = userTable.table.map((tr, i, tablr) => {
      const da = tr.every(e => e > 0 && e !== 6);
      rowEmpted += da;
      if (da) {
        return false
      }
      return tr;
    });

    newTable = newTable.filter(tr => tr);

    for (let i = newTable.length; i < 20; i++) newTable.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    userTable.table = newTable;
    userTable.isEnd = isEnd;
    userTable.current = {
      figure: current,
      cord: {
        x: 0,
        y: 4,
      },
    };

    const allTable = { ...game.tables };
    allTable[user.playerId] = userTable;

    game.tables = allTable;//JSON.parse(JSON.stringify(allTable)) ;
    game.markModified('tables');
    // console.log('GAME SAE IN UPDATE START', new Date());
    await game.save();
    // console.log('GAME SAE IN UPDATE END', new Date());

    if (rowEmpted) {
      eventEmitter.emit('serverEvent',
        {event: 'blockRow', data: { blockedRoom: rowEmpted, playerId: user.playerId, roomId } }
        );
    }
    return {
      Status: 1,
      type: 'gameUpdate',
      gameId: game.roomId,
      gameData: { ...game.getValue(), updatedBy: user.playerId },
    };
  }
}
