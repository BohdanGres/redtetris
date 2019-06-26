import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

import store from './../../utils/store'
import { pageChange } from './../../actions/pageChange';




const HeaderNavBar = () => {

  const handleClick1 = (e) => {
    store.dispatch(pageChange('home'));
  };
  const handleClick2 = (e) => {
    store.dispatch(pageChange('game_rooms'));

  };
  const handleClick3 = (e) => {
    store.dispatch(pageChange('game'));

  };
  return (
    <List component="nav">
      <ListItem component="div">
        <ListItemText inset>
            <Button variant="outlined" value="home" onClick={handleClick1}>
              Main Page
            </Button>
        </ListItemText>
        <ListItemText inset>
          <Button variant="outlined" value='game_rooms' onClick={handleClick2}>
            Game rooms
          </Button>
        </ListItemText>
        <ListItemText inset>
          <Button variant="outlined" value="game" onClick={handleClick3}>
            Game
          </Button>
        </ListItemText>
      </ListItem >

    </List>
  )
}


export default HeaderNavBar;
