import Contact from './contact';
import License from './license';

/**
 * [definition description]
 * @type {[type]}
 */
export default class Info {
  contact: Contact;
  description: string; // required
  license: License;
  termsOfService: string;
  title: string;
  version: string; // required

  /**
   * [constructor description]
   * @param  {[type]} definition [description]
   * @return {[type]}            [description]
   */
  constructor(
    { contact = {}, description, license = {}, termsOfService = '', title = '', version } = {}
  ): void {
    this.contact = new Contact(contact);
    this.description = description;
    this.license = new License(license);
    this.termsOfService = termsOfService;
    this.title = title;
    this.version = version;
  }
}
