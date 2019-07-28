import socket from './socket'

const execQueue = async (game) => {
  if (game.inQueue && game.serviceQueue.length) {
    console.log('START RUN SERVISE ', new Date());
    await game.serviceQueue[0]();
    console.log('STOP RUN SERVISE ', new Date());
    game.serviceQueue.shift();
    if (!game.serviceQueue.length) {
      game.inQueue = false;
    }
  }

  if (game.serviceQueue.length) {
    setTimeout(execQueue.bind({}, game), 0);
  }
}

export default class GameRunner {
  constructor(game) {
    this.game = game;
    this.status = true;
    this.serviceQueue = [];
    this.da = true;
  }

  createRunner(roomId) {
    return function gameTick() {
      socket.emit('action', { Status: 1, type: 'goDown' }, roomId);
    };
  }

  runGame() {
    this.fd = setInterval(this.createRunner(this.game.roomId), 1000);
    this.queueFd = setInterval(this.execQueue.bind(this), 50);
  }

  stopGame() {
    clearInterval(this.fd);
    clearInterval(this.queueFd);
    this.game = null;
    this.status = false;
  }

  async execQueue() {
    if (this.da && this.serviceQueue.length) {
      this.da = false;
      await this.serviceQueue[0]();
      this.serviceQueue.shift();
      this.da = true;
    }
  }

  async push(service) {
    this.serviceQueue.push(service);
  }
}
