import config from 'config';

import { getAuthorizationHeader } from 'server/utils/auth';
import { queryAuthentication } from 'server/services/auth';

/**
 * [ensureAuthenticated description]
 * @param  {[type]} ctx [description]
 * @return {[type]}     [description]
 */
export const ensureAuthenticated = async (ctx: Object, next: Function): void => {
  const token: String = getAuthorizationHeader(ctx);
  const user: Object = await queryAuthentication(token);

  if (!user) {
    ctx.status = 301;
    ctx.redirect(`${config.services.auth.uri}/login`);
  } else {
    ctx.request.token = token;
    ctx.request.user = user.profile;

    await next();
  }
};
