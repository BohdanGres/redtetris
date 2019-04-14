// import 'index.css';
import React from 'react'

import { Row } from './../Row/index';
import {connect} from "react-redux";



const buildRow = (n) => {
  const row = [];
  for (let i =0; i < n; i++)
  {
   row.push(<Row key={i}/>)
  }
  return row;
}

// buildRow()

const BoardMain = ({width, height, message}) => {
  console.log('=====================');
  console.log(width, height, message);
  console.log('=====================');
  return (
    <div className="mainBoard">
      {buildRow(height)}
    </div>
  )
}



const mapStateToProps = (state) => {
  return state
}


export default connect(mapStateToProps, null)(BoardMain)
