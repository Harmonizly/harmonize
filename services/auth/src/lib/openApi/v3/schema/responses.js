import Headers from './headers';
import MediaTypes from './mediaTypes';
import Links from './links';

/**
 * [requestBodies description]
 * @type {[type]}
 */
export class Response {
  // Required
  content: MediaTypes;
  description: string;
  headers: Headers;
  links: Links;

  /**
   * [constructor description]
   * @param  {Object} [content={}] [description]
   * @param  {[type]} description  [description]
   * @param  {Object} [headers={}] [description]
   * @param  {Object} [links={}]   [description]
   * @return {[type]}              [description]
   */
  constructor({ content = {}, description, headers = {}, links = {} } = {}): void {
    this.content = new MediaTypes(content);
    this.description = description;
    this.headers = new Headers(headers);
    this.links = new Links(links);
  }
}

/**
 * Responses Object
 *
 * A container for the expected responses of an operation. The container maps a HTTP response code to the expected
 * response.
 *
 * The documentation is not necessarily expected to cover all possible HTTP response codes because they may not be
 * known in advance. However, documentation is expected to cover a successful operation response and any known errors.
 *
 * The default MAY be used as a default response object for all HTTP codes that are not covered individually by the
 * specification.
 *
 * The Responses Object MUST contain at least one response code, and it SHOULD be the response for a successful
 * operation call.
 */
export default class Responses {
  responses: Object<string | number, Response> = {};

  constructor(definitions: Object<string | number, Object> = []): void {
    for (const [key: string | number, definition: Object] of definitions.entries()) {
      this.responses[key] = new Response(definition);
    }
  }
}
