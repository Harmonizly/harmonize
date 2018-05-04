import config from 'config';
import gql from 'graphql-tag';

import client from 'server/services/lib/client';
import { Logger } from 'axon';

const LOGGER: Logger = Logger.getLogger('app');
const CLIENT: Function = client(`${config.services.auth.uri}/query`);

/**
 * [QueryAuthentication description]
 * @type {[type]}
 */
export const queryAuthentication: Function = async (token: String): Promise<Object|Error> => {
  try {
    return await CLIENT.query({
      query: gql`
        query Authentication {
          authenticated
        }
      `,
      variables: { token },
    });
  } catch (e) {
    debugger;
    LOGGER.error(e);
    return null;
  }
};

export const queryProfile: Function = async (token: String): Promise<Object|Error> => {
  try {
    return CLIENT.query({
      query: gql`
        query Profile {
          profile {
            displayName
            id
            name {
              familyName
              givenName
            }
            emails
            picture
            locale
          }
        }
      `,
      variables: { token },
    });
  } catch (e) {
    LOGGER.error(e);
    throw e;
  }
};
