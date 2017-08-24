import DataType from './index';

/**
 *
 */
export default class Double extends DataType {
  /**
   *
   */
  constructor(): void {
    super();
    this.commonName = 'double';
    this.type = 'number';
    this.format = 'double';
  }
}
