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
    },
    streams: {},
  },
  name: 'app.harmonize',
  port: 3000,
  secure: false,
  ssl: {},
  services: {
    auth: {
      url: '//auth.harmonize.local/api/v1/',
    },
  },
  static: {
    options: {},
    path: './static',
    url: '/static',
  },
};
