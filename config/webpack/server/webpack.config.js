const appCompiler = require('./webpack.api.js');
const routerCompiler = require('./webpack.router.js');

module.exports = [ appCompiler, routerCompiler ];
