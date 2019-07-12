import React from 'react'
import configUi from '../../../../etc/config-ui';

const createCell = (row) => {

  const cells = row.map((cel, i) => {
    return (<div key={i} className="cell" style={{backgroundColor: configUi.colorValue[cel]}}></div>);
  });
  return  cells;
};


export const Row = ({ row }) => {

  return (
    <div className="row">
      {createCell(row)}
    </div>
      )
};

