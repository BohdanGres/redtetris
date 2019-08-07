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
import * as user from '../src/client/actions/userCreate'

import {assert, expect, any} from 'chai'

describe('user test all actions', () => {
  it('should test init function', () => {
      expect(actions.init()).to.deep.equal({type:'INIT_TYPE', body: any})
    }
  )
  it('should test error function', () => {
      expect(action.error()).to.deep.equal({type:'ERROR', error: any})
    }
  )
  it('should test errorModal function', () => {
      expect(act.setName()).to.deep.equal({type:'ERROR_MODAL', errorModal: any})
    }
  )
  it('should test auth function', () => {
      expect(acti.auth()).to.deep.equal({type:'AUTH', data: any})
    }
  )
  it('should test clearStore function', () => {
      expect(store.clearStore()).to.deep.equal({type:'CLEAR_STORE', initialStore: any})
    }
  )
  it('should test clearStoreSoft function', () => {
      expect(store.clearStoreSoft()).to.deep.equal({type:'CLEAR_STORE_SOFT', initialStore: any})
    }
  )
  it('should test game start function', () => {
      expect(game.gameStart()).to.deep.equal({type:'GAME_START', gameData: any})
    }
  )
  it('should test y arrow function', () => {
      expect(game.y()).to.deep.equal({type:'Y_ARROW', pos: any})
    }
  )
  it('should test x arrow function', () => {
      expect(game.x()).to.deep.equal({type:'X_ARROW', pos: any})
    }
  )
  it('should test game update function', () => {
      expect(game.gameUpdate()).to.deep.equal({type:'GAME_UPDATE', gameData: any})
    }
  )
  it('should test game block down function', () => {
      expect(game.blockDown()).to.deep.equal({type:'BLOCK_DOWN'})
    }
  )
  it('should test game block function', () => {
      expect(game.block()).to.deep.equal({type:'BLOCK'})
    }
  )
  it('should test server function', () => {
      expect(serv.ping()).to.deep.equal({type:'server/ping'})
    }
  )
  it('should test page change function', () => {
      expect(page.pageChange()).to.deep.equal({type:'PAGE_CHANGE', page: any})
    }
  )
  it('should test room create function', () => {
      expect(room.roomCreate()).to.deep.equal({type:'ROOM_CREATE', room: any})
    }
  )
  it('should test room subscribe function', () => {
      expect(room.roomSubscribe()).to.deep.equal({type:'ROOM_SUBSCRIBE', room: any})
    }
  )
  it('should test room list update function', () => {
      expect(roomList.roomListUpdate()).to.deep.equal({type:'ROOM_LIST_UPDATE', roomList: any})
    }
  )
  it('should test set name function', () => {
      expect(set.setName()).to.deep.equal({type:'SET_NAME', name: any})
    }
  )
  it('should test user create function', () => {
      expect(user.userCreate()).to.deep.equal({type:'USER_CREATE', userData: any})
    }
  )
})

import * as style from '../src/client/components/BoardMain/index'
import * as table from '../src/client/components/BoardMain/index'
import {Row} from "../src/client/components/Row";
import React from "react";

// describe('GameContainr', function() {
//   it('should add class to element', function() {
//     var element = { className: '' };
//
//     GameContainr(element, 'test-class');
//
//     assert.equal(element.className, 'test-class');
//   });
//
//   it('should not add a class which already exists');
// });

describe('Board main', () => {
  it('should styles', () => {
      expect(style.makeStyles()).to.deep.equal({theme: any})
    }
  )
  it('BuildRow', function() {
      expect(buildRow({ table })).to.deep.equal(<Row key={i}  row={row}/>)
    }
  )
})


//need to be fixed with DOM - make a lot of profit for tests

import * as index from '../src/client/index'

describe('Board main', () => {
  it('should test getting tetris id', () => {
      expect(index.getElementById()).to.deep.equal({ app: 'tetris'})
    }
  )
})



