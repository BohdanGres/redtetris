import React from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { connect } from 'react-redux'

import Room from './../components/Room';
import Typography from "@material-ui/core/Typography";
import List from '@material-ui/core/List';
import GameRow from '../components/GameRow';
import MyRoom from './../components/MyRoom';

import socket from './../utils/socket';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
/*
    height: 200,
*/
    width: 600,
    'margin-top': 50,
    padding: 20,
  },
  control: {
    padding: theme.spacing(2),
  },
  progress: {
    margin: theme.spacing(2),
    width: 600,
  },
  button: {
    'margin-top': 30,
  }

}));

const GameTable = ({ roomPending, roomList }) => {

  const [spacing, setSpacing] = useState(2);
  const classes = useStyles();

  function handleChange(event, value) {
    setSpacing(Number(value));
  }

  const [input, setInput] = useState('');

  const handleInput = (e, v) => {
    setInput(v);
  };

  return (
    <Grid container className={classes.root} spacing={10}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={spacing}>
          <Grid key={1} item>
            <Paper className={classes.paper}>
              {(!roomPending) ? (<Room/>) : (MyRoom(roomPending)) }
            </Paper>
          </Grid>
          <Grid key={2} item>
            <Paper className={classes.paper}>
              <Typography variant="h5" color="inherit" paragraph>
                Room list
              </Typography>
              { (!roomList.length) ?
                ( <CircularProgress className={classes.progress} color="secondary" />) :
                (<List>
                  {roomList.map((room, i) => {
                    return GameRow(room, i, !!roomPending);
                  })}
                </List>)
              }
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    roomPending: state.roomPending,
    roomList: state.roomList
  }
};
export default connect(mapStateToProps, null)(GameTable)


