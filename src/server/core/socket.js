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
    console.log('RESPONSE');
    if (to) {
      console.log('RESPONSE TO ROOM');
      this.io.to(to).emit(event, data);
    } else {
      this.io.emit(event, data);
    }

  }
}

const socket = new Socket();

export default socket;
