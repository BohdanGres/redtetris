import socket from './socket'


export default class GameRunner {
  constructor(game) {
    this.game = game;
    this.status = true;
    this.serviceQueue = [];
    this.inQueue = false;
  }

  // gameTick(roomId) {
  //   console.log(roomId);
  //   socket.emit('testTick', { Status: 1 }, roomId);
  // }

  createRunner(roomId) {
    return function gameTick() {
      socket.emit('action', { Status: 1, type: 'goDown' }, roomId);
    };
  }

  runGame() {

    if (this.status) {
      this.fd = setInterval(this.createRunner(this.game.roomId), 5000);
    }
  }

  stopGame() {
    clearInterval(this.fd);
    this.game = null;
    this.status = false;
  }

  async execQueue() {
    console.log(this);
    if (this.serviceQueue.length) {
      this.serviceQueue[0]();
      this.serviceQueue.shift();
    }

    if (this.serviceQueue.length) {
      setTimeout(this.execQueue.bind(this), 0);
    }
  }

  async push(service) {
    this.serviceQueue.push(service);
    setTimeout(this.execQueue.bind(this), 0);

  }
}
