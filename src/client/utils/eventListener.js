import store from "./store";
import {x, y} from "../actions/gameAction";
import config from "../../../etc/config-ui";
import socket from "./socket";
import {getCookie} from "./cookie";

export default function eventInit() {
  function cb(e) {




    const state = store.getState();

    // return xHandler(newStateX, action);



    if (state.page !== 'game') {
      return;
    }
    const keys = {
      ArrowRight: () => store.dispatch(y(1)),
      ArrowUp: () => store.dispatch(x(-1)),
      ArrowDown: () => store.dispatch(x(1)),
      ArrowLeft: () => store.dispatch(y(-1)),
    };


    if (e.key === 'ArrowDown') {
      let flag = false;

      const tableState = state.tables[state.userUuid];
      const lengthX = tableState.current.cord.x + tableState.current.figure.figure.length + 1;

      const x = tableState.current.cord.x;
      const y = tableState.current.cord.y

      const figure = tableState.current.figure.figure;

      figure[figure.length - 1].forEach((cell, i) => {

        if ((cell > 0 && tableState.table[x + figure.length -1][y + i] > 0) || lengthX > config.ROW) {
          flag = true;
        }
      });
      if (flag) {
        socket.emit('setFigure', {
          x,
          y,
          figure,
          playerId: getCookie('uuid'),
          roomId: state.roomId
        });
        return ;
      }
    }
    if (keys[e.key]) {

      keys[e.key]();
    }
  };
  window.addEventListener('keydown', cb, true);
}
