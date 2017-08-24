import DataType from './index';

/**
 *
 */
export default class Float extends DataType {
  /**
   *
   */
  constructor(): void {
    super();
    this.commonName = 'float';
    this.type = 'number';
    this.format = 'float';
  }
}
