import DataType from './index';

/**
 *
 */
export default class Binary extends DataType {
  /**
   *
   */
  constructor(): void {
    super();
    this.commonName = 'binary';
    this.type = 'string';
    this.format = 'binary';
    this.comment = 'any sequence of octets';
  }
}
