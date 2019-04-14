// import 'index.css';
import React from 'react'

import Row from './../Row/index';



const buildRow = (n) => {
  const row = [];
  for (let i =0; i < n; i++)
  {
   row.push(<Row i={i}></Row>)
  }
  return row;
}



export const BoardMain = () => {
  return (
    <div>
      {buildRow()}
    </div>
  )
}

