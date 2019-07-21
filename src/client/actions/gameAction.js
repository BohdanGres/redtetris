export const GAME_START = 'GAME_START';

export const gameStart = (gameData) => {
  return {
    type: GAME_START,
    gameData,
  }
};

export const Y_ARROW = 'Y_ARROW';

export const y = (pos) => {
  return {
    type: Y_ARROW,
    pos
  }
};

export const X_ARROW = 'X_ARROW';

export const x = (pos) => {
  return {
    type: X_ARROW,
    pos
  }
};

export const GAME_UPDATE = 'GAME_UPDATE';

export const gameUpdate = (gameData) => {
  return {
    type: GAME_UPDATE,
    gameData,
  }
};

export const ROTATE = 'ROTATE';

export const rotate = (matrix) => {
  const theta = matrix.reduce((omega,alpha) => omega.concat(alpha));
  const delta = [];
  for(let x = 0; x < matrix[0].length; x++) {
    let i = x;
    delta[x] = [];
    for (let j = i; j  < theta.length; ) {
      delta[x].push(theta[j]);
      j += matrix[0].length;
    }
    delta[x].reverse();
  }
  return {
    type: ROTATE,
    mat: delta,
  }
};
