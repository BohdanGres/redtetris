import chai, {any, expect} from "chai"
import {startServer, configureStore} from './helpers/server'
import openSocket from 'socket.io-client';
import params from '../params'

chai.should()

describe('Fake server test', function(){
  let tetrisServer
  before(cb => startServer(params.server, function(err, server){
    tetrisServer = server
    cb()
  }))

  after(function(done){tetrisServer.stop(done)})
  const socket = openSocket('http://localhost:3004');
  it('should return room list', async function() {


    socket.emit('roomList', {} );
    const initialState = {}

    const res = new Promise((res, reject) => {
      socket.on('action', data => {
        res(data);
      })
    });

    const test = await res;
    test.should.deep.equal({ Status: 1, type: 'listRoomUpdate', roomList: [] })
  });


  it('should return user list', async function() {

    socket.emit('userList', {} );
    const initialState = {}

    const res = new Promise((res, reject) => {
      socket.on('action', data => {
        res(data);
      })
    });

    const test = await res;
    test.type.should.equal('listUser')
  });

});
