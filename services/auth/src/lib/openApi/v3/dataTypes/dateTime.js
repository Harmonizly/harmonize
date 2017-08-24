import DataType from './index';

/**
 *
 */
export default class DateTime extends DataType {
  /**
   *
   */
  constructor(): void {
    super();
    this.commonName = 'dateTime';
    this.type = 'string';
    this.format = 'date-time';
    this.comment = 'As defined by date-time-RFC3339';
  }
}
