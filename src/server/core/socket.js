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
      this.io.to(to).emit("event_name",data);
    } else {
      this.io.emit("event_name",data);
    }

  }
}

const socket = new Socket();

export default socket;
