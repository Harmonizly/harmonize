import DataType from './index';

/**
 *
 */
export default class Long extends DataType {
  /**
   *
   */
  constructor(): void {
    super();
    this.commonName = 'long';
    this.type = 'integer';
    this.format = 'int64';
    this.comments = 'signed 64 bits';
  }
}
