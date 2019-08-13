import store from "./store";
import { x, y, rotate, blockDown } from "../actions/gameAction";
import config from "../../../etc/config-ui";
import socket from "./socket";
import {getCookie} from "./cookie";

export default function eventInit() {
  function cb(e) {
    const state = store.getState();
    if (state.blockDown) return;

    const rotateF = (state) => {
      const id = state.userUuid;
      const figure = state.tables[id].current.figure.figure;
        store.dispatch(rotate(figure));
    };

    const rot = (matrix) => {
      const theta = matrix.reduce((omega, alpha) => omega.concat(alpha));
      const delta = [];
      for (let x = 0; x < matrix[0].length; x++) {
        let i = x;
        delta[x] = [];
        for (let j = i; j < theta.length;) {
          delta[x].push(theta[j]);
          j += matrix[0].length;
        }
        delta[x].reverse();
      }
      return delta
    }
    // return xHandler(newStateX, action);



    if (state.page !== 'game') {
      return;
    }
    const keys = {
      ArrowRight: {
        f: () => store.dispatch(y(1)),
        dx: 1,
        dy: 0
      },
      ArrowUp: {
        f: () => {
          const figure = rotateF(state);
        },
        dx: 0,
        dy: 0
      },
      ArrowDown: {
        f: () => store.dispatch(x(1)),
        dx: 0,
        dy: 1
      },
      ArrowLeft: {
        f: () => store.dispatch(y(-1)),
        dx: -1,
        dy: 0
      },
    };


    // if (e.key === 'ArrowDown') {

    // }
    if (keys[e.key]) {
      const { f, dx, dy } = keys[e.key];
      let flag = false;

      const tableState = JSON.parse(JSON.stringify(state.tables[state.userUuid]));
      const lengthX = tableState.current.cord.x + tableState.current.figure.figure.length + 1;

      const newXX = tableState.current.cord.x;
      const newYY = tableState.current.cord.y;

      let figure = tableState.current.figure.figure;

      if (e.key === 'ArrowUp') {
        figure = rot(figure);
      }
      const table = tableState.table;
      try {

        figure.forEach((line, y) => {
          line.forEach((bloc, x) => {
            const newY = y + newXX + dy;
            const newX = x + newYY + dx;
            if (newX < 0 || newX > 10) { ; throw 0;}
            let onBoard = true
            let free = true

            if (newY > 19) throw 0;
            if (onBoard && newY >= 0 && table[newY][newX] !== 0) free = false
            if (figure[y][x] > 0 && (!onBoard || !free)) throw 0;
          })
        })
      } catch (e) {
        flag = true;
      }
      if (flag) {
        if (e.key !== 'ArrowDown') {
          return;
        }
        socket.emit('setFigure', {
          x: newXX,
          y: newYY,
          figure,
          playerId: getCookie('uuid'),
          roomId: state.roomId
        });
        store.dispatch(blockDown());
        return ;
      }
      f();
    }
  };
  window.addEventListener('keydown', cb, true);
}
