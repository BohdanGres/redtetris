import socket from './socket';


export default class Res {
  constructor({ connectionType, socket }) {
    this.connectionType = connectionType;
    this.socket = socket
  }
  send(data) {
    if (this.connectionType === 'singleRequest') {
      this.singleRequest(data);
    } else if (this.connectionType === 'allRequest') {
      Res.allRequest(data);
    } else if (this.connectionType === 'roomRequest') {
      Res.roomRequest(data);
    }
  }

  sendError(data) {
    if (this.socket.emit) {
      this.socket.emit('SERVER_ERROR', {...data});
    }
  }

  singleRequest(data) {
    this.socket.emit('action', { ...data });
  }

  static allRequest(data) {
    socket.io.emit('action', { ...data });
  }

  static roomRequest(data) {
    socket.io.to(data.gameId).emit('action', { ...data });
  }
}
