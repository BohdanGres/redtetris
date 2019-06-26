import React from 'react';
import Dialog from '@material-ui/core/Dialog';

import DialogTitle from '@material-ui/core/DialogTitle';
import {useState} from 'react';


import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';


import { connect } from 'react-redux'
import store from "../../utils/store";
import { error as Error } from './../../actions/error';

const  ErrorPopup = ({ error }) => {
  const handleClose  = ()  => {
    store.dispatch(Error(null));
  };
  console.log(error);
  if (!!error == false) {
    return (<div/>);
  }
  return (
    <div>
      <Dialog
        open={!!error}
        onClose={handleClose}
        aria-labelledby="error-dialog-title"
        disableBackdropClick={true}>
        <DialogTitle id="error-dialog-title">SomeProblem...</DialogTitle>
        <DialogContentText>
          {error.message}
          {error.field}
        </DialogContentText>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Ok(
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    error: state.error,
  }
};


export default connect(mapStateToProps, null)(ErrorPopup);
//export default connect(mapStateToProps, null)(withStyles(theme)(Popup));
