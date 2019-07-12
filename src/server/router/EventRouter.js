import { makeServiceRunner } from './../core/serviceRuner'
import service from "../service";
import Res from './../core/respons';

const EventEmitter = require('events');

export const eventEmitter = new EventEmitter();

export function iniEventRouter() {
  eventEmitter.on('serverEvent', ({ event, data }) => {

    switch (event) {
    case 'roomListUpdate':
      const res = new Res({ connectionType: 'allRequest', socket:{} });
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
