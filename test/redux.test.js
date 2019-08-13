import {configureStore} from './helpers/server'

import rootReducer from '../src/client/reducers/alert'
import { alert } from './../src/client/actions/alert'
import chai from "chai"
const MESSAGE = "message"
chai.should()
describe('Fake redux test', function(){
  it('alert it', function(done){
    let initialState = {}
    const store =  configureStore(rootReducer, null, initialState, {
      ALERT_POP: ({dispatch, getState}) =>  {
        const state = getState()
        state.message.should.equal(MESSAGE)
        done()
      }
    })
    store.dispatch(alert(MESSAGE))
  });

});


