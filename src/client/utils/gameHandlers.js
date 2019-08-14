import config from '../../../etc/config-ui';

export const handleCollision = (y, x, table, figure) => {
  const setFigure = (table, figure) => {
    figure.forEach((row, i) => {
      (col, j) => {
        table[i + y][j + x] = 1;
      }
    });
  };

  for (let i = 0; i < figure.length; i++) {
    if (table[y][x + i] > 0) {
      setFigure(table, figure);
      return;
    }
  }
};

export const yHandler = (state, action) => {
  const newStateY = { ...state };

  const tableStateY = newStateY.tables[newStateY.userUuid];
  const lengthY = tableStateY.current.cord.y + tableStateY.current.figure.figure[0].length + action.pos;

  if (lengthY > config.COL || tableStateY.current.cord.y + action.pos < 0
    || tableStateY.current.cord.y + action.pos < 0 ) {
    return newStateY;
  }

  newStateY.tables[newStateY.userUuid].current.cord.y += action.pos;
  newStateY.i = newStateY.i + 1;


  return newStateY;
};

export const xHandler = (state, action) => {
  const newStateX = { ...state };
  const tableState = newStateX.tables[newStateX.userUuid];
  const lengthX = tableState.current.cord.x + tableState.current.figure.figure.length + action.pos;
  const lengthY = tableState.current.cord.y + tableState.current.figure.figure[0].length;
  if (lengthX > config.ROW || tableState.current.cord.x + action.pos < 0
    || tableState.current.cord.y + action.pos < 0 ) {
    return newStateX;
  }
  handleCollision(lengthX, lengthY, newStateX.tables[newStateX.userUuid].table, tableState.current.cord.x + tableState.current.figure.figure);

  newStateX.tables[newStateX.userUuid].current.cord.x += action.pos;
  newStateX.i = newStateX.i + 1;
  return newStateX;
};

