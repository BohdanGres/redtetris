export const ROOM_CREATE = 'ROOM_CREATE';

export const roomCreate = (room) => {
  return {
    type: ROOM_CREATE,
    room,
  }
};

export const ROOM_SUBSCRIBE = 'ROOM_SUBSCRIBE';

export const roomSubscribe = (room) => {
  return {
    type: ROOM_SUBSCRIBE,
    room,
  }
};
