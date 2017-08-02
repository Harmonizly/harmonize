import driver from 'services/auth/db/neo4j';
import model from 'seraph-model';
import { GENERAL_ERROR } from 'services/auth/exception/codes';

// Create the Google Account model
const Google: Object = model(driver, 'google');

/**
 *
 */
Google.schema({
  id: { type: 'string', required: true },
  profile: { type: 'object', required: true }
});

Google.setUniqueKey('id');
Google.useTimestamps();

/**
 * [description]
 * @param  {[type]} profile [description]
 * @return {[type]}         [description]
 */
Google.save = async function (profile: Object): Promise<void> {
  return new Promise((resolve: Function, reject: Function): void => {
    return Google.prototype.save({
      id: profile.id,
      profile
    }, (err: any, account: Object): void => {
      if (err) {
        return reject(
          GENERAL_ERROR(`Failed to save Google Account ${profile.id}: ${err}`)
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
Google.link = async function (user: Object): Promise<void> {
  return new Promise((resolve: Function, reject: Function): void => {
    return driver.relate(this, 'connected', user, { to: user.id }, (err: any, relationship: Object): void => {
      if (err) {
        return reject(
          GENERAL_ERROR(`Failed to link the Google Account ${this.id} to the user '${user.username}': ${err}`)
        );
      }
      return resolve(relationship);
    });
  });
};

// TODO move to generic model or update library
Google.where = function (predicate: Object, opts: Object = {}): Promise<any> {
  return new Promise((resolve, reject) => {
    Google.prototype.where(predicate, opts, (err: any, matchingModels: Array<Object>) => {
      if (err) {
        return reject(err);
      }
      return resolve(matchingModels);
    });
  });
};

export default Google;
