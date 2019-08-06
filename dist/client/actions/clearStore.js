"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearStoreSoft = exports.CLEAR_STORE_SOFT = exports.clearStore = exports.CLEAR_STORE = void 0;
var CLEAR_STORE = 'CLEAR_STORE';
exports.CLEAR_STORE = CLEAR_STORE;

var clearStore = function clearStore(initialStore) {
  return {
    type: CLEAR_STORE,
    initialStore: initialStore
  };
};

exports.clearStore = clearStore;
var CLEAR_STORE_SOFT = 'CLEAR_STORE_SOFT';
exports.CLEAR_STORE_SOFT = CLEAR_STORE_SOFT;

var clearStoreSoft = function clearStoreSoft(initialStore) {
  return {
    type: CLEAR_STORE_SOFT,
    initialStore: initialStore
  };
};

exports.clearStoreSoft = clearStoreSoft;