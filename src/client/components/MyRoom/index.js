import React from 'react'
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import socket from "../../utils/socket";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { getCookie } from './../../utils/cookie';

const playerList = (name, i) => (
  <ListItem key={i}>
    <ListItemText
      variant='h3'
      primary={name}
    />
  </ListItem>);

const MyRoom = (room) => {
  const handler = () => {
    socket.emit('gameStart', { roomId: room.roomId, playerId: getCookie('uuid') });
  };
  console.log('room', room);
  return (
    <div>
      <Typography variant="h4" >
        Players :
      </Typography>
      <List>
        { room.playerNames.map((name, i) => { return playerList(name, i) })}
      </List>
      <Button variant="outlined" color="secondary" onClick={handler}>
        START!!!
      </Button>
    </div>
  )
};

export default MyRoom;

