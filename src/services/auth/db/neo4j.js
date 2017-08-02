import config from 'config';
import Logger from 'services/auth/utils/logger';
import seraph from 'seraph';

const dbConfig = config.db;
const driver = seraph({
  server: dbConfig.server,
  endpoint: dbConfig.endpoint,
  user: dbConfig.user,
  pass: dbConfig.password
});

export default driver;
