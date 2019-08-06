"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.roomListUpdate = exports.ROOM_LIST_UPDATE = void 0;
var ROOM_LIST_UPDATE = 'ROOM_LIST_UPDATE';
exports.ROOM_LIST_UPDATE = ROOM_LIST_UPDATE;

var roomListUpdate = function roomListUpdate(roomList) {
  return {
    type: ROOM_LIST_UPDATE,
    roomList: roomList
  };
};

exports.roomListUpdate = roomListUpdate;