import App from './../containers/app';
import Login from './../containers/login'
import GameTable from './../containers/gameTable'
import Home from './../containers/home';
import {connect, Provider} from "react-redux";
import React from 'react';

import Header from './../components/Header';

const getPage = ({ page }) => {

  switch (page) {
    case 'home':
      return (<Home/>);
      break;
    case 'game_rooms':
      return (<GameTable/>);
      break;
    case 'game':
      return (<App/>);
    default:
      return (<GameTable/>);
      break;
  }
};

const Router = ({ page }) => {
  return (<div>
    <Header/>
    {getPage({ page })}
  </div>);
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, null)(Router)

