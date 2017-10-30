const appCompiler = require('./modules/webpack.app.js');
const routerCompiler = require('./modules/webpack.router.js');

module.exports = [appCompiler, routerCompiler];
