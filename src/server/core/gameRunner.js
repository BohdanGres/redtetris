import socket from './socket'


export default class GameRunner {
  constructor(game) {
    this.game = game;
    this.status = true;
  }

  // gameTick(roomId) {
  //   console.log(roomId);
  //   socket.emit('testTick', { Status: 1 }, roomId);
  // }

  createRunner(roomId) {
    return function gameTick() {
      console.log(roomId);
      socket.emit('action', { Status: 1, type: 'goDown' }, roomId);
    };
  }

  runGame() {

    if (this.status) {
      this.fd = setInterval(this.createRunner(this.game.roomId), 2000);
    }
  }

  stopGame() {
    clearInterval(this.fd);
    this.game = null;
    this.status = false;
  }
}
