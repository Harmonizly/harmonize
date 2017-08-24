import DataType from './index';

/**
 *
 */
export default class Byte extends DataType {
  /**
   *
   */
  constructor(): void {
    super();
    this.commonName = 'byte';
    this.type = 'string';
    this.format = 'byte';
    this.comment = 'base64 encoded characters';
  }
}
