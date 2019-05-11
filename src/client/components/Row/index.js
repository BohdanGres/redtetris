import React from 'react'
import configUi from '../../../../etc/config-ui';


const test = (e) => {
  alert(123);
};

const createCell = (amount, color = {}) => {

  const realColor = Object.values(color);
  const cells = [];
  for (let i = 0; i < amount; i++) {
    // console.log('???? = ', realColor[1]);
    cells.push(<div key={i} className="cell" onClick={test} style={{backgroundColor: configUi.colorValue[realColor[i]]}}></div>);
  }
  return  cells;
}

createCell(configUi.COL);

export const Row = ({ width, color }) => {
  // console.log('ROW ROW ROW', color);

 // // console.log([k,i])
 //  console.log('im row data = ' + k + color);
  return (
    <div className="row">
      {createCell(width, color)}
    </div>
      )
}

