/**
 * [description description]
 * @type {[type]}
 */
export default class ExternalDocumentation {
  description: string;
  url: string; // required

  /**
   * [callbacks description]
   * @type {[type]}
   */
  constructor({ description = '', url } = {}): void {
    this.description = description;
    this.url = url;
  }
}
