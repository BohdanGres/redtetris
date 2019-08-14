import '@babel/polyfill'
import 'regenerator-runtime/runtime';
import params  from '../../params'
import * as server from './index'
server.create(params.server).then( () => console.log('ready to play tetris with U ...') )
