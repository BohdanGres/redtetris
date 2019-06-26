// import 'index.css';
import React from 'react'

// import { Row } from './../Row/index';
import {connect} from "react-redux";

const buildRow = (height, width, color) => {
  const row = [];
  for (let i =0; i < height; i++)
  {
    row.push(<Row key={i} width={width} color={color[i]}/>)
  }
  return row;
};

const BoardMain = ({width, height, array}) => {
  return (
    <div className="mainBoard">
      {buildRow(height,width, array)}
    </div>
  )
};



const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps, null)(BoardMain)
