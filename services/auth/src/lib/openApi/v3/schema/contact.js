/**
 * [name description]
 * @type {[type]}
 */
export default class Contact {
  email: string;
  name: string;
  url: string;

  constructor({ email = '', name = '', url = '' } = {}): void {
    this.email = email;
    this.name = name;
    this.url = url;
  }
}
