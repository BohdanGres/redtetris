import reducer from '../src/client/reducers/alert'
import chai from "chai";
import { configureStore } from "./helpers/server";
import { alert } from './../src/client/actions/alert'

const MESSAGE = "message";
chai.should();
describe('test alert action', ()=>{



  it('SUPER TESOVUI TEST', (done) =>{
  let defaultState = {};

  const store = configureStore(reducer, null, defaultState, {
    ALERT_POP: ({dispatch, getState}) =>  {
      const state = getState();
      state.message.should.equal(MESSAGE);
      done()
    }});
  store.dispatch(alert(MESSAGE))
  })
})


