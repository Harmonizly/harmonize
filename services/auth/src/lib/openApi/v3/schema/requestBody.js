import MediaTypes from './mediaTypes';

/**
 * [content description]
 * @type {[type]}
 */
export default class RequestBody {
  content: MediaTypes; // required
  description: string;
  required: boolean;

  /**
   * [callbacks description]
   * @type {[type]}
   */
  constructor({ content, description = '', required = false } = {}): void {
    this.content = new MediaTypes(content);
    this.description = description;
    this.required = required;
  }
}

/**
 * [requestBodies description]
 * @type {[type]}
 */
export class RequestBodies {
  requestBodies: Object<string, RequestBody> = {};

  /**
   * [definitions description]
   * @type {[type]}
   */
  constructor(definitions: Object<string, Object> = {}): void {
    for (const [key: string, definition: Object] of definitions.entries()) {
      this.requestBodies[key] = new RequestBody(definition);
    }
  }
}
