import store from "./store";
import {x, y} from "../actions/gameAction";

export default function eventInit() {
  function cb(e) {
    const { page } = store.getState();
    if (page !== 'game') {
      return;
    }
    const keys = {
      ArrowRight: () => store.dispatch(y(1)),
      ArrowUp: () => store.dispatch(x(-1)),
      ArrowDown: () => store.dispatch(x(1)),
      ArrowLeft: () => store.dispatch(y(-1)),
    };
    console.log(e.key);
    if (keys[e.key]) {

      keys[e.key]();
    } else {
      console.log('asdasd');
    }
  };
  window.addEventListener('keydown', cb, true);
}
