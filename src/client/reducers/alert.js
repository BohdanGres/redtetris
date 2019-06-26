const reducer = (state = {} , action) => {

  switch(action.type){
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
      return {...state, roomList: action.roomList};
    case 'ROOM_CREATE':
      return { ...state, roomPending: action.room};
    case 'SESSION_INIT':
      return { ...state, roomPending: action.roomPending }
    default:
      return state
  }
};

export default reducer

