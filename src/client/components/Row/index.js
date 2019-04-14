



import React from 'react'

let cells = [];

const createCell = (amount) => {
  for (let i = 0; i < amount; i++) {
    cells.push(<div key={i} className="cell" style={{backgroundColor: "white"}}></div>);
  }
}

createCell(COL);

export const Row = (i) => {
  return (
    <div className="row">
      {cells}
    </div>
      )
}

