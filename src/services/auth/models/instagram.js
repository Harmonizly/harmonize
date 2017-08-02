import driver from 'services/auth/db/neo4j';
import model from 'seraph-model';
import { GENERAL_ERROR } from 'services/auth/exception/codes';

// Create the Instagram Account model
const Instagram: Object = model(driver, 'instagram');

/**
 *
 */
Instagram.schema({
  id: { type: 'string', required: true },
  profile: { type: 'object', required: true }
});

Instagram.setUniqueKey('id');
Instagram.useTimestamps();

/**
 * [description]
 * @param  {[type]} profile [description]
 * @return {[type]}         [description]
 */
Instagram.save = async function (profile: Object): Promise<void> {
  return new Promise((resolve: Function, reject: Function): void => {
    return Instagram.prototype.save({
      id: profile.id,
      profile
    }, (err: any, account: Object): void => {
      if (err) {
        return reject(
          GENERAL_ERROR(`Failed to save Instagram Account ${profile.id}: ${err}`)
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
Instagram.link = async function (user: Object): Promise<void> {
  return new Promise((resolve: Function, reject: Function): void => {
    return driver.relate(this, 'connected', user, { to: user.id }, (err: any, relationship: Object): void => {
      if (err) {
        return reject(
          GENERAL_ERROR(`Failed to link the Instagram Account ${this.id} to the user '${user.username}': ${err}`)
        );
      }
      return resolve(relationship);
    });
  });
};

// TODO move to generic model or update library
Instagram.where = function (predicate: Object, opts: Object = {}): Promise<any> {
  return new Promise((resolve, reject) => {
    Instagram.prototype.where(predicate, opts, (err: any, matchingModels: Array<Object>) => {
      if (err) {
        return reject(err);
      }
      return resolve(matchingModels);
    });
  });
};

export default Instagram;
