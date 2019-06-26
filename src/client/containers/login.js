import React, { useState } from 'react'

import {setName} from "../actions/setName";



import socket from './../utils/socket';

let name = '';

const handleSubmit = (e) => {
e.preventDefault();
  console.log(name);
  socket.emit('action', { type: 'setName', body: { name } } );
};

const handleChange = (val, e) => {
    name = val;
    console.log('name', name);
};

const Login = () => {

  return (
<h1>,</h1>
  );




 /* return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" /!* value={name} *!/ name="name"
               onChange={e => handleChange(e.target.value, e)} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );*/
};

export default Login;
/*const mapStateToProps = (state) => {
  return {
    message: state.message
  }
}
export default connect(mapStateToProps, null)(App)*/


