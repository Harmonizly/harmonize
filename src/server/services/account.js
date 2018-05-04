import config from 'config';

import client from 'server/services/lib/client';

const accountClient: ApolloClient = client(`${config.services.account.uri}/query`);

/**
 * [Account description]
 * @type {[type]}
 */
export const queryAccount: Function = async (userId: Number): Promise<Object|Error> => {
  try {
    return accountClient({
      query: `
        query Account {
          id
        }
      `,
      variables: { userId },
    });
  } catch (e) {
    debugger;
    throw e;
  }
};
