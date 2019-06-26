import React, {useState} from 'react'
import configUi from '../../../../etc/config-ui';
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core";
import store from "../../utils/store";
import socket from "../../utils/socket";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {},
  button: {
    'margin-top': 30,
  },

}));


const Room = () => {
  const classes = useStyles();
  const [roomName, setRoomName] = useState('');

  const handleInput = (e, v) => {
    setRoomName(e.target.value);
  };

  const handleCreate = (e) => {
    const userUuid = store.getState().userUuid;
    socket.emit('roomCreate', { userUuid, name: roomName } );
  };

  return (
    <div>
      <Typography variant="h5" color="inherit" paragraph>
        Create you're own room
      </Typography>
      <Input
        autoFocus
        margin="dense"
        id="gameCreate"
        titel="Room name"
        placeholder="Room name"
        label="room name"
        onChange={handleInput}
        fullWidth
        />
      <Button
        variant="outlined"
        color="primary"
        onClick={handleCreate}
        className={classes.button}>
        Do it!
      </Button>
    </div>
  )
};

export default Room;

