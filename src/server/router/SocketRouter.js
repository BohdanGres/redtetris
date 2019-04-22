
import config_be from './../../../etc/config-be';


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

  const y = config_be.bordParam.width;
  const x = config_be.bordParam.height;
  let board = [];
  for (let i =0; i < x; i++) {
    let tmpY = [];
    for (let j = 0; j < y; j++) {
      tmpY.push(getRandomInt(5));
    }
    board.push(tmpY);
  }
  console.log(board);
  console.log(x, y);
  return {
    array: board,
    width: y,
    height:x
  };

};


const generate = (n) => {
  const ar = [];
  for (let i = 0; i < n; i++) {
    ar.push(getRandomInt(3))
  }
  return ar;
};


const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));
