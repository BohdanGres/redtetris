import SimpleNodeLogger from 'simple-node-logger';

const opts = {
  logFilePath: 'error-log.log',
  timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
};

const log = SimpleNodeLogger.createSimpleLogger(opts);

export default log;
