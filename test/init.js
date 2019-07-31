import * as actions from '../src/client/actions/error'
import * as action from '../src/client/actions/init' //init
import {expect, any} from 'chai'


describe('user test all actions', () => {
  it('should test init function', () => {
      expect(action.init()).to.deep.equal({type:'INIT_TYPE', body: any})
    }
  )
  it('should test error function', () => {
      expect(actions.error()).to.deep.equal({type:'ERROR', error: any})
    }
  )
})
