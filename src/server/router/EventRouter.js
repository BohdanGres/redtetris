import { makeServiceRunner } from './../core/serviceRuner'
import service from '../service';
import Res from './../core/respons';
import Req from './../core/request';
import container from '../core/gameContainer';
import contextBuilder from '../utils/contextBuilder';

const EventEmitter = require('events');

const eventEmitter = new EventEmitter();

export function iniEventRouter() {
  eventEmitter.on('serverEvent', async ({ event, data }) => {

    switch (event) {
    case 'roomListUpdate': {
      const res = new Res({connectionType: 'allRequest', socket: {}});
      makeServiceRunner(service.Room.List,
        {},
        {}
      )({res, req: {}});
      break;
    }
    case 'blockRow': {
      const res = new Res({connectionType: 'roomRequest', socket: {} });
      const req = new Req({id: null});
      const game = container.getGame(data.roomId);
      if (!game) {
        return;
      }

      const step = makeServiceRunner(service.Game.Row.Update,
        { ...data },
        {}
      );
      game.push(step.bind(step, ({res, req})));
    }
      break;
      case 'looseGame': {
        const res = new Res({connectionType: 'roomRequest', socket: {} });
        const req = new Req({id: null});
        const game = container.getGame(data.roomId);
        if (!game) {
          return;
        }

        const step = makeServiceRunner(service.Game.Delete,
          { ...data },
          {}
        );
        game.push(step.bind(step, ({res, req})));
      }
      break;
    default :
      break;
    }
  });
}

export default eventEmitter;

