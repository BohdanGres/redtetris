import React from 'react'
import configUi from '../../../../etc/config-ui';
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import store from "../../utils/store";
import socket from "../../utils/socket";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const playerList = (name, i) => (
  <ListItem>
    <ListItemText
      key={i}
      variant='h3'
      primary={name}
    />
  </ListItem>);

const MyRoom = (room) => {
  console.log('room', room);
  // const classes = useStyles();
  return (
    <div>
      <Typography variant="h4" >
        Players :
      </Typography>
      <List>
        { room.playerNames.map((name, i) => { return playerList(name, i) })}
      </List>
    </div>
  )
};

export default MyRoom;

