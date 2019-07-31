import React from 'react'
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import socket from "../../utils/socket";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const playerList = (name, i) => (
  <ListItem key={i}>
    <ListItemText
      variant='h3'
      primary={name}
    />
  </ListItem>);

const MyRoom = (room, userUuid) => {
  const handler = () => {
    socket.emit('gameStart', { roomId: room.roomId, playerId: userUuid });
  };

  const handleLeft = () => {
    socket.emit('leftRoom', { roomId: room.roomId, playerId: userUuid });
  };

  const handleDelete = () => {
    socket.emit('deleteRoom', { roomId: room.roomId, playerId: userUuid });
  };

  const yourRoom = room.createdBy == userUuid;
  return (
    <div>
      <Typography variant="h4" >
        Players :
      </Typography>
      <List>
        { room.playerNames.map((name, i) => { return playerList(name, i) })}
      </List>
      <Button variant="outlined" color="secondary" onClick={yourRoom ? handler : handleLeft}>
        { yourRoom? 'START!!!' : 'left room'}
      </Button>
      {yourRoom ?
        (
          <Button variant="outlined" color="secondary" onClick={handleDelete}>
            Delete(
         </Button>
        )
        : ''}
    </div>
  )
};

export default MyRoom;

