import React from 'react';
import Dialog from '@material-ui/core/Dialog';

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import {useState} from 'react';

import AcauntCheck from './AcountCheck';
import AcountConfirm from './AcountConfirm';

import { connect } from 'react-redux';
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  popup: {
    padding: 20,
  },
}));




const  Popup = ({ userUuid, userName, loginPopup, userType }) => {
  const [open, setOpen] = useState(loginPopup);
  const [inputValue, setInputValue] = useState('');
  const [passValue, setPassValue] = useState('');

  const handleClose = (e) => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handlePassChange = (e) => {
    setPassValue(e.target.value);
  };

  const done = (userType === 'OLD_USER' || userType === 'NEW_USER');

  const getPopup = (userType) => {
    if (userType == 'OLD_USER') {
      return AcountConfirm({ handleClose, inputValue, handleInputChange, passValue, handlePassChange, userName });
    } else if (userType == 'NEW_USER') {
      return AcauntCheck({ handleClose, inputValue, handleInputChange, passValue, handlePassChange });
    }

    return (<DialogActions className={useStyles.popup}>
              <Button onClick={handleClose} color="primary">
                Yep!
              </Button>
            </DialogActions>);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        disableBackdropClick={true}
        disableEscapeKeyDown={true}>
        <DialogTitle id="form-dialog-title">{ done ? 'Welcome!' : 'Hi!'}</DialogTitle>
        {getPopup(userType)}
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userName: state.userName,
    userUuid : state.userUuid,
    loginPopup : state.loginPopup,
    userType : state.userType,
  }
};

export default connect(mapStateToProps, null)(Popup);
