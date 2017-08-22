import driver from 'server/db/neo4j';
import model from 'lib/seraph-adapter';
import { GENERAL_ERROR } from 'server/exception/codes';

// Create the Instagram Account model
const InstagramAccount: Object = model(driver, 'instagram');

/**
 *
 */
InstagramAccount.schema = {
  id: { type: 'string', required: true },
  profile: { type: 'object', required: true }
};

InstagramAccount.setUniqueKey('id');
InstagramAccount.useTimestamps();

/**
 * [description]
 * @param  {[type]} user [description]
 * @return {[type]}      [description]
 */
InstagramAccount.connect = async function (account: Object, user: Object): Promise<Object> {
  return new Promise((resolve: Function, reject: Function): void => {
    return driver.relate(account, 'connected', user, { to: user.id }, (err: any, relationship: Object): void => {
      if (err) {
        return reject(
          GENERAL_ERROR(`Failed to link the Instagram Account ${account.id} to the user '${user.username}': ${err}`)
        );
      }

      return resolve(relationship);
    });
  });
};

/**
 * [description]
 * @param  {[type]} account [description]
 * @return {[type]}         [description]
 */
InstagramAccount.getConnectedUser = async function (account: Object): Promise<Object> {
  return new Promise((resolve: Function, reject: Function) => {
    return driver.relationships(account, 'all', 'connected', (err: any, relationships: Array<Object>) => {
      if (err) {
        return reject(err);
      }

      // We assume only one connected relationship
      return resolve(relationships[0]);
    });
  });
};

export default InstagramAccount;
