import driver from 'server/db/neo4j';
import model from 'lib/seraph-adapter';
import { GENERAL_ERROR } from 'server/exception/codes';

// Create the Facebook Account model
const FacebookAccount: Object = model(driver, 'facebook');

/**
 *
 */
FacebookAccount.schema = {
  id: { type: 'string', required: true },
  profile: { type: 'object', required: true }
};

FacebookAccount.setUniqueKey('id');
FacebookAccount.useTimestamps();

/**
 * [description]
 * @param  {[type]} user [description]
 * @return {[type]}      [description]
 */
FacebookAccount.connect = async function (account: Object, user: Object): Promise<Object> {
  return new Promise((resolve: Function, reject: Function): void => {
    return driver.relate(account, 'connected', user, { to: user.id }, (err: any, relationship: Object): void => {
      if (err) {
        return reject(
          GENERAL_ERROR(`Failed to link the Facebook Account ${account.id} to the user '${user.username}': ${err}`)
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
FacebookAccount.getConnectedUser = async function (account: Object): Promise<Object> {
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

export default FacebookAccount;
