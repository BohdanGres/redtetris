import { makeServiceRunner } from './../core/serviceRuner'
import service from "../service";
import Res from './../core/respons';

const EventEmitter = require('events');

export const eventEmitter = new EventEmitter();

export function iniEventRouter() {
  const res = new Res({ connectionType: 'allRequest', socket:{} });
  eventEmitter.on('serverEvent', ({ event, data }) => {

    switch (event) {
    case 'roomListUpdate':
      makeServiceRunner(service.Room.List,
          {},
          {}
        )({ res, req: {} });
      break;
    default :
      break;
    }
  });
};
