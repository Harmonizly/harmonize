import OpenApi from './schema/openApi';

/**
 * [description]
 * @param  {[type]} definion [description]
 * @return {[type]}          [description]
 */
export default function openApi(definition: Object): void {
  console.log(definion);
  const api = new OpenApi(definition);
  console.log(api);
}
