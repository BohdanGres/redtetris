import Game from './../model/Game';
import Player from './../model/Player'
import GameRunner from './gameRunner';

class GameContainr {
  constructor() {
    this.gameList = [];
  }

  push(game) {
    console.log('GAME PUSHED');
    const startedGame = new GameRunner(game, this.gameList.length);
    startedGame.runGame();
    this.gameList.push(startedGame);
  }

  getGame(id) {
    return this.gameList.find(GameRunner => ( GameRunner.game && GameRunner.game.roomId));
  }
  getGameList() {

    return this.gameList;
  }

  clearContainer() {
    this.gameList.filter(runningGame => !runningGame.game);
  }

}

const container = new GameContainr();

export default container;
