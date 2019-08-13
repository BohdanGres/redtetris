export const USER_LIST = 'USER_LIST';

export const users = (users) => {
  return {
    type: USER_LIST,
    users
  }
}

