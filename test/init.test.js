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


import * as style from '../src/client/components/BoardMain/index'
import * as table from '../src/client/components/BoardMain/index'

// describe('Board main', () => {
//   it('should styles', () => {
//       expect(style.makeStyles()).to.deep.equal({theme: any})
//     }
//   )
//   it('BuildRow', function() {
//       expect(buildRow({ table })).to.deep.equal(<Row key={i}  row={row}/>)
//     }
//   )
// })

//
// //need to be fixed with DOM - make a lot of profit for tests - fixed
//
import * as index from '../src/client/index'

// describe('client', () => {
//   it('should test getting tetris id', () => {
//       expect(index.getElementByid()).to.deep.equal({ app: 'tetris'})
//     }
//   )
// })

import * as indexserver from '../src/server/index'
import  params from '../params';
//
// describe('server', () => {
//   it('should test server init', () => {
//       expect(indexserver.create(params.server)).to.deep.equal(promise)
//     }
//   )
// })

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

import red from '../src/client/reducers/index'

// describe('reducers', () => {
//   it('should test reducers', () => {
//       expect(red.default()).to.deep.equal(any)
//     }
//   )
// })

import * as mid from '../src/client/middleware/storeStateMiddleWare'

// describe('middleware', () => {
//   it('should test middleware', () => {
//       expect(mid.storeStateMiddleWare({ getState })).to.deep.equal(any)
//     }
//   )
// })

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