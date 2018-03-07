/**
 * { item_description }
 */

// Allow config mutations
// process.env.ALLOW_CONFIG_MUTATIONS = true;

process.env.NODE_CONFIG_DIR = `${__dirname}/config`;

var Server = require('./assets/server').default;
var server = new Server();

server.start();
