export default function initRouter(socket) {





  socket.on('action', (action) => {
    console.log(action);
    if(action.type === 'ping'){
      socket.emit('action', {type: 'pong'})
    } else if (action.type === 'init') {




      socket.emit('action', {
        type: 'init',
        body: randomTable()
      })
    }else {
      socket.to(socket.id).emit('action', {type: 'ping'})
    }
  });
}



const randomTable = () => {

  const x = getRandomInt(5);
  const y = getRandomInt(5);
  const xy = [].fill(0,0,x);
  for (let i =0; i < x ; i++) {
    xy[i] = [].fill(0,0,y);
  }
  return {
    array: xy,
    width: x,
    height:y
  };

};



const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max)) + 5;
