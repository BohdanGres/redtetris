import config from './../../../etc/config-ui';
import { xHandler } from './../utils/gameHandlers'
import socket from './../utils/socket';
import { getCookie } from './../utils/cookie';

const reducer = (state = {}, action) => {

  switch(action.type) {
    case 'server/ping':
      return { ...state };
    case 'INIT_TYPE':
      return { ...state, ...action.body };
    case 'ALERT_POP':
      return { ...state, ...action}
    case 'CHANGE_WIDTH':
      return { ...state, width: action.width };
    case 'SET_NAME':
      return { ...state, userName: action.name };
    case 'ERROR':
      return  { ...state, error: action.error };
    case 'USER_CREATE':
      return { ...state, ...action.userData };
    case 'AUTH':
      return { ...state, ...action.data };
    case 'CLEAR_STORE':
      return { ...action.initialStore, userUuid: '', userName: '', userType: 'NEW_USER', loginPopup: true};
    case 'PAGE_CHANGE':
      return { ...state, page: action.page };
    case 'ROOM_LIST_UPDATE':
      if (state.roomPending) {
        const roomPendingIndex = action.roomList.findIndex(room => room.roomId === state.roomPending.roomId)
        if (roomPendingIndex !== -1) {
          return { ...state, roomList: action.roomList, roomPending: action.roomList[roomPendingIndex] }
        }
      }
      return {...state, roomList: action.roomList };
    case 'ROOM_CREATE':
      return { ...state, roomPending: action.room };
    case 'SESSION_INIT':
      return { ...state, roomPending: action.roomPending };
    case 'GAME_START':
      return { ...state, roomPending: null, ...action.gameData, page: 'game', blockDown: false };
    case 'GAME_UPDATE':
      if (action.gameData.updatedBy !== state.userUuid) {
        action.gameData.tables[state.userUuid] = state.tables[state.userUuid];
      } else if (action.gameData.updatedBy === state.userUuid && action.gameData.tables[state.userUuid].isEnd) {
        return { ...state, roomPending: null, ...action.gameData, page: 'game', blockDown: true };
      }
      return { ...state, roomPending: null, ...action.gameData, page: 'game', blockDown: false };
  case 'Y_ARROW':
      let newStateY = JSON.parse(JSON.stringify(state));// { ...state };

    let tableStateY = newStateY.tables[newStateY.userUuid];
      let lengthY = tableStateY.current.cord.y + tableStateY.current.figure.figure[0].length + action.pos;

      let newY = tableStateY.current.cord.y + action.pos;
      let newX = tableStateY.current.cord.x;

      // if ()getCurent
      if (lengthY > config.COL || tableStateY.current.cord.y + action.pos < 0
        || tableStateY.current.cord.y + action.pos < 0 ) {
        return newStateY;
      }

    newStateY.tables[newStateY.userUuid].current.cord.y += action.pos;
    newStateY.i = newStateY.i + 1;
      return newStateY;
  case 'X_ARROW':
    let newStateX = JSON.parse(JSON.stringify(state));
    // return xHandler(newStateX, action);
    let tableState = newStateX.tables[newStateX.userUuid];
    let lengthX = tableState.current.cord.x + tableState.current.figure.figure.length + action.pos;

    let x = tableState.current.cord.x;
    let y = tableState.current.cord.y

    let figure = tableState.current.figure.figure;

    // let flag = false;
    // figure[figure.length - 1].forEach((cell, i) => {
    //
    //   if ((cell > 0 && tableState.table[x + figure.length -1][y + i] > 0) || lengthX > config.ROW) {
    //     console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! DAAAAAA');
    //     console.log({
    //       tst: x,
    //       tst2: figure.length,
    //       tst3: y,
    //       x: tableState.table[x + figure.length -1][y + i],
    //       y:lengthX
    //     });
    //     flag = true;
    //   }
    // });
    // if (flag) {
    //   socket.emit('setFigure', {
    //     x,
    //     y,
    //     figure,
    //     playerId: getCookie('uuid'),
    //     roomId: newStateX.roomId
    //   });
    //   return { ...newStateX };
    // }

    if (lengthX > config.ROW || tableState.current.cord.x + action.pos < 0
      || tableState.current.cord.y + action.pos < 0 ) {
      return newStateX;
    }
      newStateX.tables[newStateX.userUuid].current.cord.x += action.pos;
      newStateX.i = newStateX.i + 1;
      return newStateX;
    case 'ROTATE':
      let rotateState = { ...state };
      let d = rotateState.tables[rotateState.userUuid].current.cord.y;
      if (d + action.mat.length > 9) {
        rotateState.tables[rotateState.userUuid].current.cord.y -= 11 - (action.mat.length + d);
      }
      rotateState.tables[rotateState.userUuid].current.figure.figure = action.mat;

      rotateState.i++;
      return rotateState;
    case 'BLOCK_DOWN':
      return { ...state, blockDown: true };
    case 'BLOCK_ROW':
      if (action.gameData.updatedBy !== action.gameData.updatedBy) {
        action.gameData.tables[state.userUuid] = state.tables[state.userUuid];
      }
      return { ...state, roomPending: null, ...action.gameData, page: 'game', blockDown: false };
    default:
      return state
  }
};

export default reducer;
