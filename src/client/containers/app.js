import React from 'react'
import { connect } from 'react-redux'

import  BoardMain  from './../components/BoardMain'

const App = ({message}) => {

  console.log(message);
  return (
    <BoardMain/>
  )
}

const mapStateToProps = (state) => {
  return {
    message: state.message
  }
}
export default connect(mapStateToProps, null)(App)


