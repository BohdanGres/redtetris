export const ROOM_CREATE = 'ROOM_CREATE';

export const roomCreate = (room) => {
  return {
    type: ROOM_CREATE,
    room,
  }
};
