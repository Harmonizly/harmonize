/**
 * [name description]
 * @type {[type]}
 */
export default class License {
  name: string; // required
  url: string;

  /**
   * [url description]
   * @type {String}
   */
  constructor({ name, url = '' } = {}): void {
    this.name = name;
    this.url = url;
  }
}
