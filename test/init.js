import * as actions from '../src/client/actions/init'
import {expect, any} from 'chai'


describe('user test all actions', () => {
  it('should test init function', () => {
      expect(actions.init()).to.deep.equal({type:'INIT_TYPE', body: any})
    }
  )
})
