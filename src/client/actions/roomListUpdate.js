export const ROOM_LIST_UPDATE = 'ROOM_LIST_UPDATE';

export const roomListUpdate = (roomList) => {
  return {
    type: ROOM_LIST_UPDATE,
    roomList  ,
  }
};
