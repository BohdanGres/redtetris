import '@babel/polyfill'

import { JSDOM } from 'jsdom';

const { window } = new JSDOM(`<div></div>`);

global.window = window;
global.document = window.document;

import {configureStore} from './helpers/server'

import rootReducer from '../src/client/reducers/alert'
import { alert } from './../src/client/actions/alert'
const MESSAGE = "message"

describe('Fake redux test', () => {
  test('alert it', done => {
    let initialState = {}
    const store =  configureStore(rootReducer, null, initialState, {
      ALERT_POP: ({dispatch, getState}) =>  {
        const state = getState()
        expect(state.message).toBe(MESSAGE)
        done()
      }
    })
    store.dispatch(alert(MESSAGE))
  });

});


