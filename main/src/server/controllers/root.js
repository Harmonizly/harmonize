/**
 * [ping description]
 * @param  {[type]} request  [description]
 * @param  {[type]} response [description]
 * @return {[type]}          [description]
 */
export function ping(request: Object, response: Object): void {
  return response.status(200).send('OK');
}
