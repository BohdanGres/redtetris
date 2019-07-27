import * as actions from "../src/client/actions/alert";
import * as chai from 'chai';

chai.should();
const expect = chai.expect;
describe('test alert action', ()=>{
  it('should test alert function', ()=>{
    expect(actions.alert({'test': 'test2'})).to.deep.equal({
      type: actions.ALERT_POP,
      body: {'test': 'test2'}
    })
  })

})
