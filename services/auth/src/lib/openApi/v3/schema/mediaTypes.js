import Schema from './schema';

/**
 * [encoding description]
 * @type {[type]}
 */
export class MediaType {
  encoding: Encodings; // The key, being the property name, MUST exist in the schema as a property
  schema: Schema;

  /**
   * [InRequirement description]
   * @type {String}
   */
  constructor({ encoding = {}, schema = {} } = {}): void {
    this.encoding = new Encodings(encoding);
    this.schema = new Schema(schema);
  }
}

/**
 * [mediaTypes description]
 * @type {[type]}
 */
export default class MediaTypes {
  mediaTypes: Object<string, MediaType> = {};

  constructor(definitions: Object<string | number, Object> = []): void {
    for (const [key: string | number, definition: Object] of definitions.entries()) {
      this.mediaTypes[key] = new MediaType(definition);
    }
  }
}
