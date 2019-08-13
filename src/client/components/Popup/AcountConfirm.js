import React from "react";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Input from '@material-ui/core/Input';
import store from "../../utils/store";
import socket from "../../utils/socket";

import { clearStore } from './../../actions/clearStore';
import { getInitialState } from './../../utils/store';
import {setCookie} from "../../utils/cookie";

const AcountConfirm = ({ handleClose, inputValue, userName, handlePassChange, passValue }) => {
  const handleSubmit = () => {
    const userUuid = store.getState().userUuid;
    socket.emit('userCheck', { name: userName, password: passValue } );
  }
  const handleCancel = () => {
    setCookie('uuid', '', 1);
    setCookie('userName', '', 10);
    store.dispatch(clearStore(getInitialState()));
  };

  return (
    <div>
      <DialogContent>
        <DialogContentText>
          Hi {userName}, hello again!
          Is this your username?
          If yes pleas enter you're password
        </DialogContentText>
        <Input
          autoFocus
          margin="dense"
          id="PasswordCheck"
          label="Password confirm"
          onChange={handlePassChange}
          type="password"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} color="primary">
          Yep!
        </Button>
        <Button onClick={handleCancel} color="primary">
          Unfortunately no((
        </Button>
      </DialogActions>
    </div>
  );
};

export default AcountConfirm;
