import { AuthorizationError } from 'server/exception';

/**
 * [resolveAuthorizationHeader description]
 * @param  {[type]} ctx [description]
 * @return {[type]}     [description]
 */
export function getAuthorizationHeader(ctx: Object): ?String {
  if (!ctx.header || !ctx.header.authorization) {
    return null;
  }

  const parts = ctx.header.authorization.split(' ');

  if (parts.length === 2 && /^Bearer$/i.test(parts[0])) {
    return parts[1];
  }

  throw new AuthorizationError();
}
