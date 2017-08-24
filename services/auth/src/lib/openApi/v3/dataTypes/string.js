import DataType from './index';

/**
 *
 */
export default class String extends DataType {
  /**
   *
   */
  constructor(): void {
    super();
    this.commonName = 'string';
    this.type = 'string';
  }
}
