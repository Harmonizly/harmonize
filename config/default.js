const authConfig = require('./services/auth/default');
const serverConfig = require('./server/default');
const swaggerConfig = require('./swagger');

module.exports = Object.assign({},
  { "auth": authConfig },
  serverConfig,
  { "swagger": swaggerConfig }
);
