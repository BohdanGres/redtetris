import Base from  './../Base'
import Game from './../../model/Game';
import Player from './../../model/Player';

import socket from './../../core/socket';

import uuidv4 from 'uuid/v4';
import { eventEmitter } from '../../router/EventRouter';

export default class Update extends Base {
  validateRules = ['x', 'y', 'figure', 'roomId'];

  async execute({ x, y, figure, roomId }) {console.log('RUUUM UPDATE');
    const { user } = this.context;
    if (!user) {
      this.throwError({ field: 'User', message: 'Yoops, you need login first' });
    }

    const game = await Game.findOne({
      roomId,
    });

    if (!game) {
      this.throwError({ field: 'Game', message: 'Yoops, such game already exis' });
    }



    const userTable = game.tables[user.playerId];
    // console.log(userTable.table);

    const color = Math.floor(Math.random() * 4);
    console.log('TESTETS', figure);
    figure.forEach( (row, i) => {
      row.forEach((col, j) => {
        userTable.table[x + i][y + j] = col ? color : 0;
      });
    });
    userTable.step += 1;

    const current = game.getCurent(userTable.step);

    userTable.current = {
      figure: current,
      cord: {
        x: 0,
        y: 0,
      },
    };
    // console.log(JSON.stringify(userTable, null, 4));

    const newTable = { ...game.tables };
    newTable[user.playerId] = userTable;


    game.tables = JSON.parse(JSON.stringify(newTable)) ;
    await game.save();
    // console.log(game.tables[user.playerId]);

    console.log('GAME Update');
    return {
      Status: 1,
      type: 'gameUpdate',
      gameId: game.roomId,
      gameData: game.getValue(),
    };
  }
}
