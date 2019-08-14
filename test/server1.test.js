import '@babel/polyfill'

import  'jest';

import {startServer, configureStore} from './helpers/server'
import params from '../params'
import { droppDatabase } from './../src/server/index';
import contextBuilder from '../src/server/utils/contextBuilder'


import service from './../src/server/service';


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


////////Room Create service test ///////////////

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
    const res = await room.execute( { roomId: roomId, playerId: uuid });
    roomId = res.roomId;
    expect({ Status: res.Status, type: res.type }).toEqual({Status: 1, type: 'reset'  });
  });


  test('Delete room test 4', async () => {
    const room = new service.Room.Delete(await contextBuilder({ userUuid: uuid }));
    const res = await room.execute( { roomId: roomId, playerId: uuid });
    roomId = res.roomId;
    expect({ Status: res.Status, type: res.type }).toEqual({Status: 1, type: 'reset'  });
  });

  ////////Room Delete service test ///////////////



  // test('Update user test ! user', async () => {
  //   const user = new service.Session.Update({name: 'test', socketId: 'testId'});
  //   try {
  //     const res = await user.execute({name: 'tes222t', password: 'test'});
  //   } catch (e) {
  //     expect(e.message).toBe('Yoops, something go wrong');
  //   }
  // });









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
