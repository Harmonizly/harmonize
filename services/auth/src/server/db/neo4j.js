import config from 'config';
import seraph from 'seraph';

const dbConfig: Object = config.auth.db;
const driver: Object = seraph({
  server: dbConfig.server,
  endpoint: dbConfig.endpoint,
  user: dbConfig.user,
  pass: dbConfig.password
});

export default driver;
