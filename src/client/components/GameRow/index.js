import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PlusOne from '@material-ui/icons/PlusOne';
import TypoGraphy from "@material-ui/core/Typography/Typography";
import socket from './../../utils/socket';
import { getCookie } from './../../utils/cookie';

const GameRow = (room, i, status) => {
  const name = room.roomName;
  const id = room.roomId;
  const playersCount = room.playerIds.length;

  const handleToggle = () => {
    if (status) {
      return;
    }
    socket.emit('subscribeOnRoom', { roomId: id, playerId: getCookie('uuid') });
  };

  return (
          <ListItem key={i} button onClick={handleToggle}>
            <ListItemText primary={`Room: ${room.roomName}`} />
            <TypoGraphy>
              {`${playersCount}/5`}
            </TypoGraphy>
            <PlusOne/>
          </ListItem>
  );
};

export default GameRow;
