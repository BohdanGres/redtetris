import App from './../containers/app';
import Login from './../containers/login'
import GameTable from './../containers/gameTable'
import Home from './../containers/home';
import {connect, Provider} from "react-redux";
import React from 'react';
import Header from './../components/Header';
import Users from './../containers/users'

const getPage = ({ page, roomPending }) => {
  let thisPage = page;

  if (roomPending && roomPending.status === 'IN GAME') thisPage = 'game';
  if (roomPending && roomPending.status === 'pending') thisPage = 'game_rooms';
  switch (thisPage) {
    case 'home':
      return (<Home/>);
      break;
    case 'game_rooms':
      return (<GameTable/>);
      break;
    case 'game':
      return (<App/>);
    case 'user_scores':
      return(<Users/>);
    default:
      return (<GameTable/>);
      break;
  }
};

const Router = ({ page, roomPending }) => {
  return (<div>
    <Header/>
    {getPage({ page, roomPending })}
  </div>);
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, null)(Router)

