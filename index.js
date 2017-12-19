/**
 * { item_description }
 */

// Allow config mutations
// process.env.ALLOW_CONFIG_MUTATIONS = true;

var Server = require('./assets/server').default;
var server = new Server();

server.start();
