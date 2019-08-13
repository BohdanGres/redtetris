import RunError from './runError'
import log from './../utils/logger';

export function makeServiceRunner(
  actionClass, /* istanbul ignore next */
  params,
  context
) {
  return async function serviceRunner({req, res}) {
    let resultPromise;
    try {
      resultPromise = await runService(actionClass, {
        params: params,
        context: context
      });
    } catch (e) {
      returnError(req, res, e);
      return;
    }
    ppResult(req, res, resultPromise);
  };
}

async function runService(service, { context = {}, params = {} }) {
  let res;
  try {
    res = await new service(context).run(params);
  } catch (e) {
    throw e;
  }
  return res;
}

function ppResult(req, res, promise) {
  const result =  promise;
  res.send(result);
}

function returnError(req, res, error) {
  log.info(error);
  if (error.field) {
    res.send({
      type: 'errorPopup',
      Status: 0,
      error: {
        [error.field]: error.message,
        message: error.message,
      }
    });
    return ;
  }
  res.sendError({
    Status: 0,
    Message: 'Server ERROR'
  });
}
// export funcmakeServiceRunner;
