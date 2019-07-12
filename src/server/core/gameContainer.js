import Game from './../model/Game';
import Player from './../model/Player'
import GameRunner from './gameRunner';

class GameContainr {
  constructor() {
    this.gameList = [];
  }

  push(game) {
    console.log('PUSH');
    const startedGame = new GameRunner(game, this.gameList.length);
    startedGame.runGame();
    console.log('game started');
    this.gameList.push(startedGame);
  }

  getGameList() {

    return this.gameList;
  }

  clearContainer() {
    this.gameList.filter(runningGame => !runningGame.game);
  }

  // static async initContainer() {
  //   let container = null;
  //   try {
  //     const gameList = await Game.find({
  //       where: {
  //         status: 'IN GAME',
  //       },
  //     });
  //     container = new this(gameList.map(game => new GameRunner(game)));
  //   } catch (e) {
  //     console.log(e);
  //     container = new this([]);
  //   }
  //   return container;
  // }
}

const container = new GameContainr();

export default container;
