import '@babel/polyfill'

import  'jest';

import {startServer, configureStore} from './helpers/server'
import params from '../params'
import { droppDatabase } from './../src/server/index';
import contextBuilder from '../src/server/utils/contextBuilder'

import Base from './../src/server/service/Base';
import service from './../src/server/service';

import req from './../src/server/core/request';
import res from './../src/server/core/respons';
import customError from './../src/server/core/runError';

describe('Fake server test', () => {
  let tetrisServer;
  beforeAll(cb => startServer(params.server, function(err, server){
    tetrisServer = server;
    cb()
  }));

  afterAll(function(done){
    droppDatabase();
    tetrisServer.stop(done)
  });

  let uuid, uuidDva;
  let roomName = 'testRoom';
  test('Create user test', async () => {
    const user = new service.Session.Create({name: 'test', socketId: 'testId'});
    const res = await user.execute({ name: 'test', password: 'test' });
    uuid = res.uuid;
    expect({ Status: res.Status, type: res.type}).toEqual({Status: 1, type: 'userCreate'});
  });
  test('Context builder test', async () => {
    const res = await contextBuilder({ userUuid: uuid });
    expect({
      "name": res.user.name,
      "password": res.user.password,
      "playerId": res.user.playerId,
      "score": 0,
      "socketId": res.user.socketId,
    }).toEqual({   "name": "test",
      "password": "test",
      "playerId": uuid,
      "score": 0,
      "socketId": "testId",})

  });
  test('Create user already exist test', async () => {
    const user = new service.Session.Create({name: 'test', socketId: 'testId'});
    try {
      const res = await user.execute({name: 'test', password: 'no_pass'});
    } catch (e) {
      expect(e.message).toBe('Yoops, such user already exist ;)');
    }
  });
  test('Show user test', async () => {
    const user = new service.Session.Show({ userName: 'test', userUuid: uuid});
    const res = await user.execute({ userName: 'test', userUuid: uuid});
    expect({ Status: res.Status, type: res.type }).toEqual({      Status: 1,
      type: 'sessionInit',});
  });
  test('Show user dont exist test', async () => {
    const user = new service.Session.Show({ userName: 'twqweest', userUuid: uuid});
    const res = await user.execute({userName: 'NO_USER', userUuid: uuid});
    expect({ Status: res.Status, type: res.type }).toEqual({      Status: 1,
      type: 'noResponse',});
  });
  test('List user test', async () => {
    const user = new service.User.List({});
    const res = await user.execute({});
    expect({ Status: res.Status, userList: res.userList }).toEqual({Status: 1, userList: [{"name": "test", score: 0}] });
  });
  test('Create user2 test', async () => {
    const user = new service.Session.Create({name: 'test2', socketId: 'testId2'});
    const res = await user.execute({ name: 'test2', password: 'test2' });
    uuidDva = res.uuid;
    expect({ Status: res.Status, type: res.type}).toEqual({Status: 1, type: 'userCreate'});
  });
  test('Delete user test', async () => {
    const user = new service.Session.Delete({name: 'test', socketId: 'testId'});
    const res = await user.execute({name: 'test', socketId: 'testId'});
    expect({ Status: res.Status }).toEqual({Status: 1  });
  });
  test('Update user test', async () => {
    const user = new service.Session.Update({name: 'test', socketId: 'testId'});
    const res = await user.execute({name: 'test', password: 'test' });
    expect({ Status: res.Status, type: res.type }).toEqual({Status: 1, type: 'userCreate'  });
  });
  test('Update user test pass error', async () => {
    const user = new service.Session.Update({name: 'test', socketId: 'testId'});
    try {
      const res = await user.execute({name: 'test', password: 'tes2t'});
    } catch (e) {
      expect(e.message).toBe('Yoops, wrong pass');
    }
  });
  test('Update user test ! user', async () => {
    const user = new service.Session.Update({name: 'test', socketId: 'testId'});
    try {
      const res = await user.execute({name: 'tes222t', password: 'test'});
    } catch (e) {
      expect(e.message).toBe('Yoops, something go wrong');
    }
  });

let roomId;

  test('Create room test', async () => {
    const room = new service.Room.Create(await contextBuilder({ userUuid: uuid }));
    const res = await room.execute({ name: roomName });
    roomId = res.game.roomId;
    expect({ Status: res.Status, type: res.type }).toEqual({Status: 1, type: 'roomCreate'  });
  });
  test('Create room test no user', async () => {
    const room = new service.Room.Create(await contextBuilder({ userUuid: '123' }));
    try {
      const res = await room.execute({ name: roomName });
    } catch (e) {
      expect(e.message).toBe('Yoops, you need login first');
    }
  });
  test('Create room test olredy exist', async () => {
    const room = new service.Room.Create(await contextBuilder({ userUuid: uuid }));
    try {
      const res = await room.execute({ name: roomName });
    } catch (e) {
      expect(e.message).toBe('Yoops, such game already exis');
    }
  });
  test('gAME START 1', async () => {
    let res;
    const sbscr = new service.Game.Create(await contextBuilder({ userUuid: '3' }));
    try {
      res = await sbscr.execute({ roomId: '-----' })
    } catch (e) {
      expect(e.message).toBe('Yoops, you need login first');
    }
  });
  test('gAME START 2', async () => {
    let res;
    const sbscr = new service.Game.Create(await contextBuilder({ userUuid: uuid }));
    try {
      res = await sbscr.execute({ roomId: '-----' })
    } catch (e) {
      expect(e.message).toBe('Yoops, no such game');
    }
  });
  test('Game start ', async () => {
    const room = new service.Game.Create(await contextBuilder({ userUuid: uuid }));
    const res = await room.execute( { roomId: roomId, playerId: uuid });
    expect({ Status: res.Status, type: res.type }).toEqual({Status: 1, type: 'gameStart'  });
  });
  test('gAME uPDATE 1', async () => {
    let res;
    const sbscr = new service.Game.Update(await contextBuilder({ userUuid: '3' }));
    try {
      res = await sbscr.execute({ roomId: '-----' })
    } catch (e) {
      expect(e.message).toBe('Yoops, you need login first');
    }
  });
  test('gAME uPDATE 2', async () => {
    let res;
    const sbscr = new service.Game.Update(await contextBuilder({ userUuid: uuid }));
    try {
      res = await sbscr.execute({ roomId: '-----' })
    } catch (e) {
      expect(e.message).toBe('Yoops, such game already exis');
    }
  });
  test('Game uPDATE ', async () => {
    console.log('uuid', uuid);
      const room = new service.Game.Update(await contextBuilder({userUuid: uuid}));
      const res = await room.execute({'x': 5, 'y': 5, 'figure': [[1, 1, 1, 1]], roomId});
      expect({Status: res.Status, type: res.type}).toEqual({Status: 1, type: 'gameUpdate'});

    });
  test('gAME delete 1', async () => {
    let res;
    const sbscr = new service.Game.Delete(await contextBuilder({ userUuid: '3' }));
    try {
      res = await sbscr.execute({ roomId: '-----' })
    } catch (e) {
      expect(e.message).toBe('Yoops, such game already exis');
    }
  });
  test('gAME delete 2', async () => {
    let res;
    const sbscr = new service.Game.Delete(await contextBuilder({ userUuid: uuid }));
    try {
      res = await sbscr.execute({ roomId: '-----' })
    } catch (e) {
      expect(e.message).toBe('Yoops, such game already exis');
    }
  });
  test('Game delete ', async () => {
    console.log('uuid', uuid);
    const room = new service.Game.Delete(await contextBuilder({userUuid: uuid}));
    const res = await room.execute({roomId});
    expect({Status: res.Status, type: res.type}).toEqual({Status: 1, type: 'gameEnd'});

  });
  test('gAME row update 1', async () => {
    let res;
    const sbscr = new service.Game.Row.Update(await contextBuilder({ userUuid: '3' }));
    try {
      res = await sbscr.execute({ roomId: '-----' })
    } catch (e) {
      expect(e.message).toBe('Yoops, such game dont exis');
    }
  });
  test('gAME  row update 2', async () => {
    let res;
    const sbscr = new service.Game.Row.Update(await contextBuilder({ userUuid: uuid }));
    try {
      res = await sbscr.execute({ roomId: '-----' })
    } catch (e) {
      expect(e.message).toBe('Yoops, such game dont exis');
    }
  });
  test('Game row update ', async () => {
    console.log('uuid', uuid);
    const room = new service.Game.Row.Update(await contextBuilder({userUuid: uuid}));
    const res = await room.execute({roomId});
    expect({Status: res.Status, type: res.type}).toEqual({Status: 1, type: 'gameUpdateRow'});

  });
  test('Base test validator', async () => {
    let res;
    const sbscr = new service.Game.Row.Update(await contextBuilder({ userUuid: uuid }));
    try {
      res = await sbscr.validate({ roowmId: '-----' })
    } catch (e) {
      expect(e.message).toBe('REQUIRED');
    }
  });
  test('Base test validator', async () => {
    let res;
    const sbscr = new service.Game.Row.Update(await contextBuilder({ userUuid: uuid }));
    try {
      res = await sbscr.validate({ rowmId: undefined })
    } catch (e) {
      expect(e.message).toBe('REQUIRED');
    }
  });
  test('Delete room test no user', async () => {
    const room = new service.Room.Delete(await contextBuilder({ userUuid: '123' }));
    try {
      const res = await room.execute( { roomId: '', playerId: '' });
    } catch (e) {
      expect(e.message).toBe('Yoops, you need login first');
    }
  });
  test('Delete room test 1', async () => {
    const room = new service.Room.Delete(await contextBuilder({ userUuid: uuid }));
    try {
      const res = await room.execute( { roomId: '', playerId: '' });
    } catch (e) {
      expect(e.message).toBe('Yoops, WTF!');
    }
  });
  test('Delete room test 2', async () => {
    const room = new service.Room.Delete(await contextBuilder({ userUuid: uuid }));
    try {
      const res = await room.execute( { roomId: roomId, playerId: '' });
    } catch (e) {
      expect(e.message).toBe('Yoops, WTF!');
    }
  });
  test('Delete room test 3', async () => {
    const room = new service.Room.Delete(await contextBuilder({ userUuid: uuid }));
    try {
      const res = await room.execute( { roomId: '', playerId: uuid });
    } catch (e) {
      expect(e.message).toBe('Yoops, WTF!');
    }
  });
  test('Subscr test 1', async () => {
    const sbscr = new service.Room.Subscriber.Create(await contextBuilder({ userUuid: uuid }));
    try {
      const res = await sbscr.execute({ roomId, playerId: uuid })
    } catch (e) {
      expect(e.message).toBe('Yoops, WTF!');
    }
  });
  test('Subscr test 2', async () => {
    let res;
    const sbscr = new service.Room.Subscriber.Create(await contextBuilder({ userUuid: uuidDva }));
    try {
      res = await sbscr.execute({ roomId, playerId: uuidDva })
    } catch (e) {
      expect(e.message).toBe('Yoops, WTF!');
    }
    expect({ Status: res.Status }).toEqual({Status: 1  });
  });
  test('Subscr delete test 1', async () => {
    let res;
    const sbscr = new service.Room.Subscriber.Delete(await contextBuilder({ userUuid: '1213' }));
    try {
      res = await sbscr.execute({ roomId, playerId: '123' })
    } catch (e) {
      expect(e.message).toBe('Yoops, you need login first');
    }
  });
  test('Subscr delete test 2', async () => {
    let res;
    const sbscr = new service.Room.Subscriber.Delete(await contextBuilder({ userUuid: uuidDva }));
    try {
      res = await sbscr.execute({ roomId: '-----', playerId: uuidDva })
    } catch (e) {
      expect(e.message).toBe('Yoops, WTF!');
    }
  });
  test('Subscr delete test 3', async () => {
    const room = new service.Room.Subscriber.Delete(await contextBuilder({ userUuid: uuidDva }));
    const res = await room.execute( { roomId: roomId, playerId: uuidDva });
    expect({ Status: res.Status, type: res.type }).toEqual({Status: 1, type: 'reset'  });
  });
  test('UrlRoom delete test 1', async () => {
    const room = new service.Room.UrlCreate.Delete(await contextBuilder({ userUuid: uuidDva }));
    const res = await room.execute( { roomId: roomId, playerId: uuidDva });
    expect({ type: res.type }).toEqual({ type: 'NO_USER'  });
  });
  test('UrlRoom delete test 1', async () => {
    const room = new service.Room.UrlCreate.Create(await contextBuilder({ userUuid: uuidDva }));
    const res = await room.execute( { name: 'TEST_ROOM', playerId: uuidDva });
    expect({ type: res.type }).toEqual({ type: 'CREATE'  });
  });
  test('UrlRoom delete test 1', async () => {
    const room = new service.Room.UrlCreate.Create(await contextBuilder({ userUuid: uuidDva }));
    const res = await room.execute( { name: roomName, playerId: uuidDva });
    expect({ type: res.type }).toEqual({ type: 'SUBSCRIBE'  });
  });
  test('Delete room test 4', async () => {
    const room = new service.Room.Delete(await contextBuilder({ userUuid: uuid }));
    const res = await room.execute( { roomId: roomId, playerId: uuid });
    roomId = res.roomId;
    expect({ Status: res.Status, type: res.type }).toEqual({Status: 1, type: 'reset'  });
  });

  /////TEST CRE FILE /////


  test('test req class', () => {
      const resp = new req({ id: 1});
    expect(resp.conectionId).toBe(1);
  });

  test('test error class', () => {
    try {
      const error = new customError({message: '1', fild: '2'});
    } catch (e) {
      expect(e.type).toBe(undefined);
    }
  });



});

import Create from '../src/server/service/Room/Subscriber/Create'

describe('should return room Subscribtion', () => {
  test('Return paper', async () => {
    const srv = new Create();
    let result;
    try {
      result = await srv.execute(['roomId', 'playerId']);
    } catch (e) {
      expect(e.message).toBe('Yoops, you need login first')
    }
  })
})


import Update  from '../src/server/service/Session/Update'

describe('session',  () => {
  test('session', async function () {
      try {
        const srvice = new Update();
        let result = await srvice.execute(['name', 'password']);
      } catch (e) {
        expect(e.message).toBe('Yoops, something go wrong')
      }
    }
  )
})
