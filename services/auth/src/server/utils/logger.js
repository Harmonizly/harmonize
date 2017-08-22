import bunyan from 'bunyan';
import config from 'config';
import createCWStream from 'bunyan-cloudwatch';
import NewRelicStream from 'bunyan-newrelic-stream';
import process from 'process';
import uuidv4 from 'uuid/v4';

let instance: Object | null = null;

/**
 * Class representing Logger
 */
export default class Logger {

  loggers: Object = {};

  /**
   * Instantiates instance or returns previous one if it already exists
   * @return { Object } Instance of the Logger class by calling init method
   */
  constructor(): Object {
    if (instance == null) {
      this.init(config.get('loggers'));
      instance = this;
    }
    return instance;
  }

  /**
   * Initialization method which sets logger using provided confing and depending on an environment
   * @param { Object } loggersConfig - Configuration options for logger
   */
  init(loggersConfig: Object): void {
    let loggerConfig;
    const handlersConfig = loggersConfig.get('handlers');
    handlersConfig.forEach((obj) => {
      loggerConfig = Object.assign({}, obj);
      const name = loggerConfig.name.toLowerCase();
      const stream = loggerConfig.stream;

      delete loggerConfig.stream;
      const logger: Object = bunyan.createLogger(loggerConfig);

      this.loadStreams(logger, stream, loggersConfig.get('streams'));
      this.loggers[name] = logger;
    });

    // Enable forwarding logged errors to Newrelic Reporting if the server is in a production environment
    if (process.env.NODE_ENV === 'production') {
      bunyan.createLogger({
        name: 'arbiter',
        streams: [{
          level: 'error',
          type: 'raw',
          stream: new NewRelicStream()
        }]
      });
    }
  }

  /**
   * Gets certain logger by name or returns root if name isn't provided
   * @param  { string } name - Name of the logger we want to get
   * @return { Object } Logger of the nae we provided
   */
  static get(name: string): Object {
    if (!instance) {
      instance = new Logger();
    }

    let loggerName;
    if (name == null) {
      loggerName = 'root';
    } else {
      loggerName = name.toLowerCase();
    }
    return instance.loggers[loggerName];
  }

  /**
   * Loads streams for cloudwatch
   * @param { Object } logger - logger instance
   * @param { string } name - name of the stream
   * @param { Object } streamsConfig - configuration for the stream
   */
  loadStreams(logger: Object, name: string, streamsConfig: Object): void {
    let streamConfig;
    switch (name) {
      case 'cloudwatch':
        streamConfig = Object.assign({}, streamsConfig.get('cloudwatch'));
        streamConfig.logStreamName += `-${process.pid}-${uuidv4()}`;
        logger.addStream({
          name: 'cloudwatch',
          type: 'raw',
          stream: createCWStream(Object.assign({}, streamConfig))
        });
        break;
      default:
        break;
    }
  }
}
