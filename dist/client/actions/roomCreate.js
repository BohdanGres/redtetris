"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.roomSubscribe = exports.ROOM_SUBSCRIBE = exports.roomCreate = exports.ROOM_CREATE = void 0;
var ROOM_CREATE = 'ROOM_CREATE';
exports.ROOM_CREATE = ROOM_CREATE;

var roomCreate = function roomCreate(room) {
  return {
    type: ROOM_CREATE,
    room: room
  };
};

exports.roomCreate = roomCreate;
var ROOM_SUBSCRIBE = 'ROOM_SUBSCRIBE';
exports.ROOM_SUBSCRIBE = ROOM_SUBSCRIBE;

var roomSubscribe = function roomSubscribe(room) {
  return {
    type: ROOM_SUBSCRIBE,
    room: room
  };
};

exports.roomSubscribe = roomSubscribe;