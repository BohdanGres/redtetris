import store from "./store";
import { x, y, rotate } from "../actions/gameAction";
import config from "../../../etc/config-ui";
import socket from "./socket";
import {getCookie} from "./cookie";

export default function eventInit() {
  function cb(e) {
    const state = store.getState();
    const checkCollision = () => {

    }

    const rotateF = (state) => {
      const id = state.userUuid;
      const figure = state.tables[id].current.figure.figure;
        store.dispatch(rotate(figure));
    };


    // return xHandler(newStateX, action);



    if (state.page !== 'game') {
      return;
    }
    const keys = {
      ArrowRight: () => store.dispatch(y(1)),
      ArrowUp: () => {
        const figure = rotateF(state);
      },
      ArrowDown: () => store.dispatch(x(1)),
      ArrowLeft: () => store.dispatch(y(-1)),
    };


    if (e.key === 'ArrowDown') {
      let flag = false;

      const tableState = JSON.parse(JSON.stringify(state.tables[state.userUuid]));
      const lengthX = tableState.current.cord.x + tableState.current.figure.figure.length + 1;

      const newXX = tableState.current.cord.x;
      const newYY = tableState.current.cord.y;

      const figure = tableState.current.figure.figure;
      const table = tableState.table;
      try {

        figure.forEach((line, y) => {
          line.forEach((bloc, x) => {
            const newY = y + newXX + 1;
            const newX = x + newYY;
            let onBoard = true
            let free = true

            if (newY > 19) throw 0;
            if (onBoard && newY >= 0 && table[newY][newX] !== 0) free = false

            console.log('flag = ', flag, figure[y][x], onBoard, free, newY, newX);
            if (figure[y][x] > 0 && (!onBoard || !free)) throw 0;
          })
        })
      } catch (e) {
        flag = true;
      }
      console.log('flag = ',flag);
      if (flag) {
        socket.emit('setFigure', {
          x :newXX,
          y : newYY,
          figure,
          playerId: getCookie('uuid'),
          roomId: state.roomId
        });
        return ;
      }
    }
    console.log('down');
    if (keys[e.key]) {

      keys[e.key]();
    }
  };
  window.addEventListener('keydown', cb, true);
}
