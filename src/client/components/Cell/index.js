import React from 'react';

let cells = [];

const createCell = (amount) => {
  for (let i = 0; i < amount; i++) {
    cells.push(<div className="cell" onClick={test} ></div>);
  }

}

createCell()


function test(e) {
  alert(123);
};

export const Cell = () => {
  return (
    <div onClick={test}></div>
  );
}
