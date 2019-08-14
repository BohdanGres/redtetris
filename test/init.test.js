import '@babel/polyfill'

import * as actions from '../src/client/actions/init'
import * as action from '../src/client/actions/error'
import * as act from '../src/client/actions/errorModal'
import * as acti from '../src/client/actions/auth'
import * as store from '../src/client/actions/clearStore'
import * as game from '../src/client/actions/gameAction'
import * as serv from '../src/client/actions/server'
import * as page from '../src/client/actions/pageChange'
import * as room from '../src/client/actions/roomCreate'
import * as roomList from '../src/client/actions/roomListUpdate'
import * as set from '../src/client/actions/setName'
import * as users from '../src/client/actions/userCreate'


import { JSDOM } from 'jsdom';

const { window } = new JSDOM(`<div></div>`);

global.window = window;
global.document = window.document;

// import {assert, expect, any} from 'chai'
import { makeStyles } from '@material-ui/core/styles';


describe('user test all actions', () => {
  test('should test init function', () => {
      expect(actions.init().type).toEqual('INIT_TYPE')
    })
  test('should test error function', () => {
      expect(action.error().type).toEqual('ERROR')
    })
  test('should test errorModal function', () => {
      expect(act.setName().type).toEqual('ERROR_MODAL')
    })
  test('should test auth function', () => {
      expect(acti.auth().type).toEqual('AUTH')
    })
  test('should test clearStore function', () => {
      expect(store.clearStore().type).toEqual('CLEAR_STORE')
    })
  test('should test clearStoreSoft function', () => {
      expect(store.clearStoreSoft().type).toEqual('CLEAR_STORE_SOFT')
    })
  test('should test game start function', () => {
      expect(game.gameStart().type).toEqual('GAME_START')
    })
  test('should test y arrow function', () => {
      expect(game.y().type).toEqual('Y_ARROW')
    })
  test('should test x arrow function', () => {
      expect(game.x().type).toEqual('X_ARROW')
    })
  test('should test game update function', () => {
      expect(game.gameUpdate().type).toEqual('GAME_UPDATE')
    })
  test('should test game block down function', () => {
      expect(game.blockDown()).toEqual({type:'BLOCK_DOWN'})
    })
  test('should test game block function', () => {
      expect(game.block()).toEqual({type:'BLOCK'})
    })
  test('should test server function', () => {
      expect(serv.ping()).toEqual({type:'server/ping'})
    })
  test('should test page change function', () => {
      expect(page.pageChange().type).toEqual('PAGE_CHANGE')
    })
  test('should test room create function', () => {
      expect(room.roomCreate().type).toEqual('ROOM_CREATE')
    })
  test('should test room subscribe function', () => {
      expect(room.roomSubscribe().type).toEqual('ROOM_SUBSCRIBE')
    })
  test('should test room list update function', () => {
      expect(roomList.roomListUpdate().type).toEqual('ROOM_LIST_UPDATE')
    })
  test('should test set name function', () => {
      expect(set.setName().type).toEqual('SET_NAME')
    })
  test('should test user create function', () => {
      expect(users.userCreate().type).toEqual('USER_CREATE')
    })
})


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

import  reducer from '../src/client/reducers/alert'

describe('reducer', () => {
  test('should test server/ping case', () => {
      expect(reducer( { a:0} , { type: 'server/ping'})).toEqual({ a:0})
    })
  test('should test INIT_TYPE case', () => {
    expect(reducer( { a:0} , { type: 'INIT_TYPE', body: {b :0}})).toEqual({ a:0, b: 0})
  })
  test('should test ALERT_POP case', () => {
    expect(reducer( { a:0} , { b: 0, type: 'ALERT_POP' })).toEqual({ a:0, b: 0, type: 'ALERT_POP'})
  })
  test('should test CHANGE_WIDTH case', () => {
    expect(reducer( { a:0} , { width: 0, type: 'CHANGE_WIDTH' })).toEqual({ a:0, width: 0})
  })
  test('should test SET_NAME case', () => {
    expect(reducer( { a:0} , { name: 'userName', type: 'SET_NAME' })).toEqual({ a:0, userName: 'userName'})
  })
  test('should test ERROR case', () => {
    expect(reducer( { a:0} , { error: 'error', type: 'ERROR' })).toEqual({ a:0, error: 'error'})
  })
  test('should test USER_CREATE case', () => {
    expect(reducer( { a:0} , { userData: 'd', type: 'USER_CREATE' })).toEqual({ a:0, 0: 'd'})
  })
  test('should test AUTH case', () => {
    expect(reducer( { a:0} , { dat:0, type: 'AUTH' })).toEqual({ a:0})
  })
  test('should test PAGE_CHANGE case', () => {
    expect(reducer( { a:0} , { page: 1, type: 'PAGE_CHANGE' })).toEqual({ a:0, page: 1})
  })
  test('should test ROOM_CREATE case', () => {
    expect(reducer( { a:0} , { room: 1, type: 'ROOM_CREATE' })).toEqual({ a:0, roomPending: 1})
  })
  test('should test ROOM_SUBSCRIBE case', () => {
    expect(reducer( { a:0} , { room: 1, type: 'ROOM_SUBSCRIBE' })).toEqual({ a:0, roomPending: 1})
  })
  test('should test CLEAR_STORE case', () => {
    expect(reducer( { a:0} , { initialStore: '', type: 'CLEAR_STORE' }, '', '', 'NEW_USER', true)).toEqual({userUuid: '', userName: '', userType: 'NEW_USER', loginPopup: true})
  })
  test('should test GAME_START case', () => {
    expect(reducer( { a:0} , { gameData: 0, type: 'GAME_START' }, 'game', false )).toEqual({ a:0, page: 'game', blockDown: false, roomPending: null})
  })
  test('should test GAME_UPDATE case', () => {
    expect(reducer( { userUuid : 'd', tables : { 'd' : {} } } , { gameData: { updatedBy: 'd' , tables : { 'd' : { isEnd: 1}}}, type: 'GAME_UPDATE' }, 'game', false )).toEqual({ page: 'game', blockDown: true, roomPending: null,    "tables":  {"d": { "isEnd": 1, }, }, "updatedBy": "d", "userUuid": "d",
  })
  })
  test('should test BLOCK_DOWN case', () => {
    expect(reducer( { a:0} , { type: 'BLOCK_DOWN' }, true )).toEqual({ a:0, blockDown: true})
  })
  test('should test USER_LIST case', () => {
    expect(reducer( { a:0} , { users: 2, type: 'USER_LIST' })).toEqual({ a:0, users: 2})
  })
  test('should test SESSION_INIT case', () => {
    expect(reducer( { a:0} , { roomPending: 'room', type: 'SESSION_INIT' }, null )).toEqual({ a:0, roomPending: 'room', winerName: null})
  })
  test('should test GAME_END case', () => {
    expect(reducer( { a:0} , { name: 'winner', type: 'GAME_END' })).toEqual({ a:0, winerName: 'winner'})
  })
  test('test Y_ARROW', () => {
    expect(reducer( { userUuid : 'd', i:0, tables: { d: { current: { cord : { y:2, x: 2 }, figure: { figure :  [[1,1,1,1]]} } } }} , { pos: 1, type: 'Y_ARROW' })).toEqual({ userUuid : 'd', i:1, tables: { d: { current: { cord : { y:3, x: 2 }, figure: { figure :  [[1,1,1,1]]} } } }})

  });
  test('test X_ARROW', () => {
    expect(reducer( { userUuid : 'd', i:0, tables: { d: { current: { cord : { y:2, x: 2 }, figure: { figure :  [[1,1,1,1]]} } } }} , { pos: 1, type: 'X_ARROW' })).toEqual({ userUuid : 'd', i:1, tables: { d: { current: { cord : { y:2, x: 3 }, figure: { figure :  [[1,1,1,1]]} } } }})

  });
  test('test ROTATE', () => {
    expect(reducer( { userUuid : 'd', i:0, tables: { d: { current: { cord : { y:2, x: 2 }, figure: { figure :  [[1,1,1,1]]} } } }} , { mat: [[1],[1],[1],[1]], type: 'ROTATE' })).toEqual({ userUuid : 'd', i:1, tables: { d: { current: { cord : { y:2, x: 2 }, figure: { figure :  [[1],[1],[1],[1]]} } } }})

  });

})




import  reducerr from '../src/client/reducers/index'

describe('reducer', () => {
  test('reducer should test server/ping case', () => {
    expect(reducerr( { a:0} , { type: 'server/ping'})).toEqual({ a:0})
  })
  test('reducer should test INIT_TYPE case', () => {
    expect(reducerr( { a:0} , { type: 'INIT_TYPE', body: {b :0}})).toEqual({ a:0, b: 0})
  })
  test('reducer should test ALERT_POP case', () => {
    expect(reducerr( { a:0} , { b: 0, type: 'ALERT_POP' })).toEqual({ a:0, b: 0, type: 'ALERT_POP'})
  })
  test('reducer should test CHANGE_WIDTH case', () => {
    expect(reducerr( { a:0} , { width: 0, type: 'CHANGE_WIDTH' })).toEqual({ a:0, width: 0})
  })
  test('reducer should test SET_NAME case', () => {
    expect(reducerr( { a:0} , { name: 'userName', type: 'SET_NAME' })).toEqual({ a:0, userName: 'userName'})
  })
  test('reducer should test ERROR case', () => {
    expect(reducerr( { a:0} , { error: 'error', type: 'ERROR' })).toEqual({ a:0, error: 'error'})
  })
  test('reducer should test USER_CREATE case', () => {
    expect(reducerr( { a:0} , { userData: 'd', type: 'USER_CREATE' })).toEqual({ a:0, 0: 'd'})
  })
  test('reducer should test AUTH case', () => {
    expect(reducerr( { a:0} , { dat:0, type: 'AUTH' })).toEqual({ a:0})
  })
  test('reducer should test PAGE_CHANGE case', () => {
    expect(reducerr( { a:0} , { page: 1, type: 'PAGE_CHANGE' })).toEqual({ a:0, page: 1})
  })
  test('reducer should test ROOM_CREATE case', () => {
    expect(reducerr( { a:0} , { room: 1, type: 'ROOM_CREATE' })).toEqual({ a:0, roomPending: 1})
  })
  test('reducer should test ROOM_SUBSCRIBE case', () => {
    expect(reducerr( { a:0} , { room: 1, type: 'ROOM_SUBSCRIBE' })).toEqual({ a:0, roomPending: 1})
  })
  test('reducer should test CLEAR_STORE case', () => {
    expect(reducerr( { a:0} , { initialStore: '', type: 'CLEAR_STORE' }, '', '', 'NEW_USER', true)).toEqual({userUuid: '', userName: '', userType: 'NEW_USER', loginPopup: true})
  })
  test('reducer should test GAME_START case', () => {
    expect(reducerr( { a:0} , { gameData: 0, type: 'GAME_START' }, 'game', false )).toEqual({ a:0, page: 'game', blockDown: false, roomPending: null})
  })
  test('reducer should test GAME_UPDATE case', () => {
    expect(reducerr( { userUuid : 'd', tables : { 'd' : {} } } , { gameData: { updatedBy: 'd' , tables : { 'd' : { isEnd: 1}}}, type: 'GAME_UPDATE' }, 'game', false )).toEqual({ page: 'game', blockDown: true, roomPending: null,    "tables":  {"d": { "isEnd": 1, }, }, "updatedBy": "d", "userUuid": "d",
    })
  })
  test('reducer should test BLOCK_DOWN case', () => {
    expect(reducerr( { a:0} , { type: 'BLOCK_DOWN' }, true )).toEqual({ a:0, blockDown: true})
  })
  test('reducer should test USER_LIST case', () => {
    expect(reducerr( { a:0} , { users: 2, type: 'USER_LIST' })).toEqual({ a:0, users: 2})
  })
  test('reducer should test SESSION_INIT case', () => {
    expect(reducerr( { a:0} , { roomPending: 'room', type: 'SESSION_INIT' }, null )).toEqual({ a:0, blockDown: false, roomPending: 'room', winerName: null})
  })
  test('reducer should test GAME_END case', () => {
    expect(reducerr( { a:0} , { name: 'winner', type: 'GAME_END' })).toEqual({ a:0, winerName: 'winner'})
  })
  test('reducer test Y_ARROW', () => {
    expect(reducerr( { userUuid : 'd', i:0, tables: { d: { current: { cord : { y:2, x: 2 }, figure: { figure :  [[1,1,1,1]]} } } }} , { pos: 1, type: 'Y_ARROW' })).toEqual({ userUuid : 'd', i:1, tables: { d: { current: { cord : { y:3, x: 2 }, figure: { figure :  [[1,1,1,1]]} } } }})

  });
  test('reducer test X_ARROW', () => {
    expect(reducerr( { userUuid : 'd', i:0, tables: { d: { current: { cord : { y:2, x: 2 }, figure: { figure :  [[1,1,1,1]]} } } }} , { pos: 1, type: 'X_ARROW' })).toEqual({ userUuid : 'd', i:1, tables: { d: { current: { cord : { y:2, x: 3 }, figure: { figure :  [[1,1,1,1]]} } } }})

  });
  test('reducer test ROTATE', () => {
    expect(reducerr ( { userUuid : 'd', i:0, tables: { d: { current: { cord : { y:2, x: 2 }, figure: { figure :  [[1,1,1,1]]} } } }} , { mat: [[1],[1],[1],[1]], type: 'ROTATE' })).toEqual({ userUuid : 'd', i:1, tables: { d: { current: { cord : { y:2, x: 2 }, figure: { figure :  [[1],[1],[1],[1]]} } } }})

  });

})

import { handleCollision } from './../src/client/utils/gameHandlers'

describe('hendler test',  () => {
  const y =2;
  const x = 2;
  const table = [[0,0,0,0,], [0,0,0,0,], [0,0,0,0,], [0,0,0,0]];
  const figure = [[1,1,1,1]];

  handleCollision(x, y, table, figure);
  expect(table).toEqual([[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]]);


})


import Update  from '../src/server/service/Session/Update'
import {startServer} from "./helpers/server";
import params from "../params";
import {droppDatabase} from "../src/server";

describe('session',  () => {
  let tetrisServer;
  beforeAll(cb => startServer(params.server, function(err, server){
    tetrisServer = server;
    cb()
  }));

  afterAll(function(done){
    tetrisServer.stop(done)
  });


  test('session', async () => {
      try {
        const srvice = new Update();
        let result = await srvice.execute(['name', 'password']);
        expect(result).toBe('Yoops, something go wrong')

      } catch (e) {
        expect(e.message).toBe('Yoops, something go wrong')
      }
    }
  )
})

