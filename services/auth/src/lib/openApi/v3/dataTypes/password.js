import DataType from './index';

/**
 *
 */
export default class Password extends DataType {
  /**
   *
   */
  constructor(): void {
    super();
    this.commonName = 'password';
    this.type = 'string';
    this.format = 'password';
    this.comment = 'A hint to UIs to obscure input';
  }
}
