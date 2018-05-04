import { GraphQLException, NetworkException } from 'axon';

import fetch from 'node-fetch';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';

type APOLLO_LINK_ERROR = {
  operation: Object,
  response: Object,
  graphQLErrors: Array<Object>,
  networkError: ?Error,
}

/**
 * [description]
 * @return {[type]} [description]
 */
function defaultErrorHandler(error: APOLLO_LINK_ERROR) {
  if (error.graphQLErrors) {
    // eslint-disable-next-line no-param-reassign
    error.response.errors = error.graphQLError.map((err: Object) => {
      return new GraphQLException(err);
    });
  }

  if (error.networkError) {
    // eslint-disable-next-line no-param-reassign
    error.networkError = new NetworkException(error.networkError);
  }
}

/**
 * [DefaultLink description]
 * @param       {[type]} opts [description]
 * @constructor
 */
function defaultLink(opts: Object): Function<ApolloLink> {
  return ApolloLink.from([
    // eslint-disable-next-line new-cap
    new onError(defaultErrorHandler),
    new HttpLink({ uri: opts.uri, fetch }),
  ]);
}

export const cache: InMemoryCache = new InMemoryCache();

/**
 * [description]
 * @param  {[type]} uri  [description]
 * @param  {[type]} link [description]
 * @return {[type]}      [description]
 */
export default function (uri: String): ApolloClient {
  return new ApolloClient({
    cache,
    connectToDevTools: (process.env.NODE_ENV === 'development'),
    link: defaultLink({ uri }),
  });
}

/**
 * [description]
 * @param  {[type]} uri [description]
 * @return {[type]}     [description]
 */
// export default function (uri: String): Function {
//   return createApolloFetch({ uri });
// }
