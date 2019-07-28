import React from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'

import Typography from "@material-ui/core/Typography";
import List from '@material-ui/core/List';

import UserRow from './../components/UserRow';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    /*
        height: 200,
    */
    width: '80%',
    'margin-top': 50,
    padding: '10%',
  },
  button: {
    'margin-top': 30,
  }

}));

const Users = ( { users } ) => {
  const classes = useStyles();
console.log('users',users);
  return (
    <Grid container className={classes.root} >
      <Grid xs={1}/>
      <Grid item xs={10}>
        <Grid container justify="center" >
           <Paper className={classes.paper}>
              <Typography variant="h5" color="inherit" >
                User list
              </Typography>
              <List>
                  {users.map((user, i) => {
                    return UserRow({ ...user, i });
                  })}
              </List>
            </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
};
export default connect(mapStateToProps, null)(Users)


