export default function initRouter(socket) {
  socket.on('action', (action) => {
    console.log(action);
    if(action.type === 'ping'){
      socket.emit('action', {type: 'pong'})
    } else {
      socket.emit('action', {type: 'ping'})
    }
  });
}
