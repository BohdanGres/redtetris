export const CLEAR_STORE = 'CLEAR_STORE';

export const clearStore = (initialStore) => {

  return {
    type: CLEAR_STORE,
    initialStore,
  }
};

export const CLEAR_STORE_SOFT = 'CLEAR_STORE_SOFT';

export const clearStoreSoft = (initialStore) => {

  return {
    type: CLEAR_STORE_SOFT,
    initialStore,
  }
};
