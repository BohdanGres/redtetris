class Socket {
  constructor() {

  }

  init(app) {
    this.io = require('socket.io')(app)
  }

  close() {
   this.io.close()
  }

  on(event, cb) {
    this.io.on(event, cb);
  }

  emit(event, data, to) {
    if (to) {
      this.io.to(to).emit(event, data);
    } else {
      this.io.emit(event, data);
    }

  }

  sendToRoom(name, data) {
    this.io.of('/').in(name).clients((error, socketIds) => {
      if (error) throw error;

      console.log('socketIds', socketIds);
      socketIds.forEach(socketId => this.io.sockets.sockets[socketId].emit('action',  { ...data }));
    });
  }

  clearRoom(name) {
    this.io.of('/').in(name).clients((error, socketIds) => {
      if (error) throw error;
      socketIds.forEach(socketId => this.io.sockets.sockets[socketId].leave(name));
    });
  }

  removePlayerFromRoom(id, name) {
    this.io.sockets.sockets[id].leave(name)
  }
}

const socket = new Socket();

export default socket;
