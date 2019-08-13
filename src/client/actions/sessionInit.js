export const SESSION_INIT = 'SESSION_INIT';

export const sessionInit = (roomPending) => {
  return {
    type: SESSION_INIT,
    roomPending,
  }
};
