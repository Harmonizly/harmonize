// TODO upload default config template to s3 and load/extend it
module.exports = {
  assets: {
    options: {},
    path: './assets',
    url: '/assets',
  },
  backlog: 511,
  body: {},
  cors: {},
  compress: {},
  hostname: '0.0.0.0',
  loggers: {
    handlers: {
      access: {
        name: 'access',
        level: 'info',
      },
      app: {
        name: 'app',
        level: 'debug',
      },
      error: {
        name: 'error',
        level: 'error',
      },
      root: {
        name: 'root',
        level: 'debug',
      },
      services: {
        name: 'services',
        level: 'info',
      },
    },
    streams: {},
  },
  name: 'app.harmonize',
  port: 3000,
  secure: false,
  ssl: {},
  services: {
    account: {
      uri: 'http://account.harmonize.local',
    },
    auth: {
      uri: 'http://auth.harmonize.local',
    },
    user: {
      uri: 'http://user.harmonize.local',
    },
    options: {
      retry: {
        delay: {
          initial: 500,
          max: 30 * 1000,
          jitter: true
        },
        attempts: {
          max: 5,
          retryIf: error => !!error
        }
      }
    }
  },
  static: {
    options: {},
    path: './static',
    url: '/static',
  },
};
