// import 'index.css';
import React from 'react'

import { Row } from './../Row/index';
import {connect} from "react-redux";

const buildRow = (table) => {
  const row = table.map((row, i) => {
    return (<Row key={i}  row={row}/>)
  });

  return row;
}

// buildRow()

const mapTable = ({ table, current }) => {
  const figure = current.figure.figure;
  const cord = current.cord;
  const newTable = table.map(tr => [...tr]);

  figure.map((tr, i, arr) => {
    tr.map((th, j, ar) => {
      newTable[i + cord.x][j + cord.y] = th;
     });
  });
  return newTable;
};


const BoardMain = ({ width, height, array, gameData, tables, userUuid }) => {
  // console.log(width, height);
  const newTable = mapTable(tables[userUuid]);

  return (
    <div className="mainBoard">
      {buildRow(newTable)}
    </div>
  )
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps, null)(BoardMain)
