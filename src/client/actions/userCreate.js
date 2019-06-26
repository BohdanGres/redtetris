
export const USER_CREATE = 'USER_CREATE';

export const userCreate = (userData) => {
  return {
    type: USER_CREATE,
    userData,
  }
}

