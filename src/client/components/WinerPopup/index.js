import React from 'react';
import Dialog from '@material-ui/core/Dialog';

import DialogTitle from '@material-ui/core/DialogTitle';
import { DialogContentText } from '@material-ui/core';


import {useState} from 'react';


import { connect } from 'react-redux';
import {getUserState} from "../../utils/cookie";
import socket from "../../utils/socket";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";





const  WinerPopup = ({ winerName }) => {
  const initial = winerName !== null;

  const handleClose = (e) => {
    socket.emit('initSession', getUserState());
    socket.emit('roomList', {} );
    socket.emit('userList', {});

  };

  return (
    <div>
      <Dialog
        open={initial}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        disableBackdropClick={true}
        disableEscapeKeyDown={true}>
        <DialogTitle id="form-dialog-title">This guy winner </DialogTitle>
        <DialogContentText> {winerName} </DialogContentText>
        <Button onClick={handleClose} color="primary">
          Yep!
        </Button>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    winerName: state.winerName
  }
};

export default connect(mapStateToProps, null)(WinerPopup);
