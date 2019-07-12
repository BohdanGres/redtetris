import config from './../../../etc/config-ui';

const reducer = (state = {}, action) => {

  switch(action.type) {
    case 'INIT_TYPE':
      return { ...state, ...action.body };
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
      return { ...state, roomPending: null, ...action.gameData, page: 'game' };
    case 'Y_ARROW':
      const newStateY = { ...state };

      const tableStateY = newStateY.tables[newStateY.userUuid];
      const lengthY = tableStateY.current.cord.y + tableStateY.current.figure.figure[0].length + action.pos;

      if (lengthY > config.COL || tableStateY.current.cord.y + action.pos < 0
        || tableStateY.current.cord.y + action.pos < 0 ) {
        return newStateY;
      }

    newStateY.tables[newStateY.userUuid].current.cord.y += action.pos;
    newStateY.i = newStateY.i + 1;
      return newStateY;
  case 'X_ARROW':
    const newStateX = { ...state };console.log('444uuu TYTYTYTYTYT???');
    const tableState = newStateX.tables[newStateX.userUuid];
    const lengthX = tableState.current.cord.x + tableState.current.figure.figure.length + action.pos;
    console.log('lengthX', lengthX, 'config.ROW', config.ROW);
    if (lengthX > config.ROW || tableState.current.cord.x + action.pos < 0
      || tableState.current.cord.y + action.pos < 0 ) {
      return newStateX;
    }
      newStateX.tables[newStateX.userUuid].current.cord.x += action.pos;
      newStateX.i = newStateX.i + 1;
      return newStateX;
    default:
      return state
  }
};

export default reducer
