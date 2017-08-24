import DataType from './index';

/**
 *
 */
export default class Date extends DataType {
  /**
   *
   */
  constructor(): void {
    super();
    this.commonName = 'date';
    this.type = 'string';
    this.format = 'date';
    this.comment = 'As defined by full-date-RFC3339';
  }
}
