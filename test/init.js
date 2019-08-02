import * as actions from '../src/client/actions/init'
import * as action from '../src/client/actions/error'
import * as act from '../src/client/actions/errorModal'
import * as acti from '../src/client/actions/auth'
import * as store from '../src/client/actions/clearStore'
import * as game from '../src/client/actions/gameAction'

import {expect, any} from 'chai'

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
  it ('should be true when actions is test', done => {
    const lol = rotate('delta')
    assert.equal(true,_.isEqual(lol, {type: 'client/rotate', mat: delta}))
    done()
  })
})
