import React from 'react';

let cells = [];

const createCell = (amount) => {
  for (let i = 0; i < amount; i++) {
    cells.push(<div className="cell"></div>);
  }

}

createCell()

export const Cell = () => {
  return (
    <div></div>
  );
}
