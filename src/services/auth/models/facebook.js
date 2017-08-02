import driver from 'services/auth/db/neo4j';
import model from 'seraph-model';
import { GENERAL_ERROR } from 'services/auth/exception/codes';

// Create the Facebook Account model
const Facebook: Object = model(driver, 'facebook');

/**
 *
 */
Facebook.schema({
  id: { type: 'string', required: true },
  profile: { type: 'object', required: true }
});

Facebook.setUniqueKey('id');
Facebook.useTimestamps();

/**
 * [description]
 * @param  {[type]} profile [description]
 * @return {[type]}         [description]
 */
Facebook.save = async function (profile: Object): Promise<void> {
  return new Promise((resolve: Function, reject: Function): void => {
    return Facebook.prototype.save({
      id: profile.id,
      profile
    }, (err: any, account: Object): void => {
      if (err) {
        return reject(
          GENERAL_ERROR(`Failed to save Facebook Account ${profile.id}: ${err}`)
        );
      }
      return resolve(account);
    });
  });
};

/**
 * [description]
 * @param  {[type]} user [description]
 * @return {[type]}      [description]
 */
Facebook.link = async function (user: Object): Promise<void> {
  return new Promise((resolve: Function, reject: Function): void => {
    return driver.relate(this, 'connected', user, { to: user.id }, (err: any, relationship: Object): void => {
      if (err) {
        return reject(
          GENERAL_ERROR(`Failed to link the Facebook Account ${this.id} to the user '${user.username}': ${err}`)
        );
      }
      return resolve(relationship);
    });
  });
};

// TODO move to generic model or update library
Facebook.where = function (predicate: Object, opts: Object = {}): Promise<any> {
  return new Promise((resolve, reject) => {
    Facebook.prototype.where(predicate, opts, (err: any, matchingModels: Array<Object>) => {
      if (err) {
        return reject(err);
      }
      return resolve(matchingModels);
    });
  });
};

export default Facebook;
