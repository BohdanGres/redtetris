import React from "react";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Input from '@material-ui/core/Input';
import socket from './../../utils/socket';
import store from './../../utils/store'

const AcountCheck = ({ inputValue, handleInputChange, passValue, handlePassChange }) => {
  const handleSubmit = () => {
    const userUuid = store.getState().userUuid;
    socket.emit('userCreate', { name: inputValue, password: passValue } );
  }

  return (
    <div>
        <DialogContent>
          <DialogContentText>
            Logged in for the first time?
            Enter your username and password please
          </DialogContentText>
          <Input
            autoFocus
            value={inputValue}
            margin="dense"
            id="Username"
            label="Username"
            onChange={handleInputChange}
            type="email"
            placeholder='username'
            fullWidth
          />
          <Input
            autoFocus
            value={passValue}
            margin="dense"
            id="password"
            label="password"
            onChange={handlePassChange}
            type="password"
            placeholder='password'
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color="primary">
            Ok
          </Button>
        </DialogActions>
    </div>
  );
};

export default AcountCheck;
