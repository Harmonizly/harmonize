import bcrypt from 'bcrypt';
import config from 'config';
import driver from 'services/auth/db/neo4j';
import Logger from 'services/auth/utils/logger';
import model from 'seraph-model';

const LOGGER: Object = Logger.get('auth');

// Create the User AAA model
const User: Object = model(driver, 'user');

/**
 *
 */
User.schema({
  email: { type: 'string', required: true, },
  id: { type: 'number', required: true, },
  lastPasswordUpdate: { type: 'date' },
  password: { type: 'string', required: true, },
  username: { type: 'string', required: true, },
});

User.setUniqueKey('id');
User.setUniqueKey('username');
User.useTimestamps();

/**
 * [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
User.beforeSave = async function (data: Object): void {
  if (data.password) {
    const hash: string = await User.hashPassword(data.password);
    // There *may* be a case where we are rehashing a password
    // (we really shouldn't be providing a hashed password to save or update to being with),
    // so check to make sure the newly hashed password matches the raw password.
    const didNeedUpdate: boolean = await User.verifyPassword(data.password, hash);
    if (didNeedUpdate) {
      data.password = hash;
    }
  }
  return this;
};

/**
 * [description]
 * @param  {[type]} plainText [description]
 * @return {[type]}           [description]
 */
User.hashPassword = async function (plainText: string): string {
  const hash: string = await bcrypt.hash(plainText, config.saltRounds);
  return hash;
};

/**
 * [description]
 * @param  {[type]} plainText [description]
 * @return {[type]}           [description]
 */
User.verifyPassword = async function (plainText: string, hash: ?string = null): boolean {
  let verified: boolean = false;
  try {
    const compare: string = (hash) || this.password;
    verified = await bcrypt.compare(plainText, compare);
  } catch (e) {
    LOGGER.error(e);
    verified = false;
  }

  return verified;
};

// TODO move to generic model or update library
User.where = function (predicate: Object, opts: Object = {}): Promise<any> {
  return new Promise((resolve, reject) => {
    User.prototype.where(predicate, opts, (err: any, matchingModels: Array<Object>) => {
      if (err) {
        return reject(err);
      }
      return resolve(matchingModels);
    });
  });
};

export default User;
