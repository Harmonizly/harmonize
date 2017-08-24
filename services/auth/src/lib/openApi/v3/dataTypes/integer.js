import DataType from './index';
/**
 *
 */
export default class Integer extends DataType {
  /**
   *
   */
  constructor(): void {
    super();
    this.commonName = 'integer';
    this.type = 'integer';
    this.format = 'int32';
    this.comments = 'signed 32 bits';
  }
}
