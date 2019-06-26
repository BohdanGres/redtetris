export const CLEAR_STORE = 'CLEAR_STORE';

export const clearStore = (initialStore) => {
  return {
    type: CLEAR_STORE,
    initialStore,
  }
};
