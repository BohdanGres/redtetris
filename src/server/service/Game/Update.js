import Base from  './../Base'
import Game from './../../model/Game';
// import Player from './../../model/Player';
//
// import socket from './../../core/socket';
//
// import uuidv4 from 'uuid/v4';
// import { eventEmitter } from '../../router/EventRouter';
const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

export default class Update extends Base {
  validateRules = ['x', 'y', 'figure', 'roomId'];

  async execute({ x, y, figure, roomId }) {
    const { user } = this.context;
    if (!user) {
      this.throwError({ field: 'User', message: 'Yoops, you need login first' });
    }

    const game = await Game.findOne({
      roomId,
    });

    console.log({game : game.tables, user});

    if (!game) {
      this.throwError({ field: 'Game', message: 'Yoops, such game already exis' });
    }



    const userTable = game.tables[user.playerId];

    // const color = Math.floor(Math.random() * 4) + 1;
    let isEnd = false;
    figure.forEach( (row, i) => {
      row.forEach((col, j) => {
        if (userTable.table[x + i][y + j] && col) {
          isEnd = true;
        }
        userTable.table[x + i][y + j] = col ? col : userTable.table[x + i][y + j];
      });
    });
    userTable.step += 1;

    const current = game.getCurent(userTable.step);

    let newTable = userTable.table.map((tr, i, tablr) => {
      const da = tr.every(e => e > 0 && e !== 6);
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
        y: 0,
      },
    };
    // console.log(JSON.stringify(userTable, null, 4));

    const allTable = { ...game.tables };
    allTable[user.playerId] = userTable;


    game.tables = JSON.parse(JSON.stringify(allTable)) ;
    await game.save();
    // console.log(game.tables[user.playerId]);

    return {
      Status: 1,
      type: 'gameUpdate',
      gameId: game.roomId,
      gameData: game.getValue(),
    };
  }
}
