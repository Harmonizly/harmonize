
const config = function () {
  if (process.env.NODE_ENV === 'production') {
    return {
      apps: [{
        script: 'index.js',
        name: 'arbiter',
        instances: 1,
        exec_mode: 'cluster',
        watch: false,
        autorestart: true,
        restart_delay: 2000
      }]
    };
  }

  return {
    apps: [{
      script: 'index.js',
      name: 'arbiter',
      instances: 1,
      exec_mode: 'cluster',
      watch: ['index.js', 'dist'],
      ignore_watch: ['node_modules', 'start']
    }]
  };
};

module.exports = config();
