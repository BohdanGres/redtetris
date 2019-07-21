// import chai from "chai"
// import React from 'react'
// import equalJSX from 'chai-equal-jsx'
// // import {createRenderer} from 'react-addons-test-utils'
// import { createRenderer } from 'react-test-renderer/shallow'
// import TestUtils from 'react-dom/test-utils'
// import {Tetris, Board} from '../src/client/components/test'

// chai.should()
// //chai.use(equalJSX)

// describe('Fake react test', function(){
//   it('works', function(){
//     const renderer = createRenderer()
//     renderer.render(React.createElement(Tetris))
//     const output = renderer.getRenderOutput()
//   //  output.should.equalJSX(<Board/>)
//   })

// })

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import {Tetris} from '../src/client/components/test';
import Adapter from 'enzyme-adapter-react-16'
import 'babel-polyfill'

require("babel-core/register");
require("babel-polyfill");

global.document = {}
global.window = {}

// if (typeof window !== 'undefined') {
//     ReactDOM.render(<MainWrapper />, document.getElementById("root"));
// }
configure({ adapter: new Adapter() });
describe('Tetris component testing', function() {
  it('renders welcome message', function() {
    const wrapper = shallow(<Tetris />); 
    const welcome = "<h1 className='Tetris'>Welcome to React</h1>";
    expect(wrapper.contains(welcome)).to.equal(true);
  });
});
