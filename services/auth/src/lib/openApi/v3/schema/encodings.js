import Headers from './headers';

/**
 * [allowReserved description]
 * @type {[type]}
 */
export class Encoding {
  // Determines whether the parameter value SHOULD allow reserved characters, as defined by RFC3986 :/?#[]@!$&'()*+,;=
  // to be included without percent-encoding. The default value is false. This property SHALL be ignored if the request
  // body media type is not application/x-www-form-urlencoded.
  allowReserved: boolean;
  // The Content-Type for encoding a specific property. Default value depends on the property type: for string with
  // format being binary – application/octet-stream; for other primitive types – text/plain; for object -
  // application/json; for array – the default is defined based on the inner type. The value can be a specific media
  // type (e.g. application/json), a wildcard media type (e.g. image/*), or a comma-separated list of the two types.
  contentType: string
  // When this is true, property values of type array or object generate separate parameters for each value of the
  // array, or key-value-pair of the map. For other types of properties this property has no effect. When style is form,
  // the default value is true. For all other styles, the default value is false. This property SHALL be ignored if the
  // request body media type is not application/x-www-form-urlencoded.
  explode: boolean;
  // A map allowing additional information to be provided as headers, for example Content-Disposition. Content-Type is
  // described separately and SHALL be ignored in this section. This property SHALL be ignored if the request body media
  // type is not a multipart.
  headers: Headers;
  // Describes how a specific property value will be serialized depending on its type. See Parameter Object for details
  // on the style property. The behavior follows the same values as query parameters, including default values. This
  // property SHALL be ignored if the request body media type is not application/x-www-form-urlencoded.
  style: string;

  /**
   * [constructor description]
   * @param  {Boolean} [allowReserved=false] [description]
   * @param  {String}  [contentType='']      [description]
   * @param  {Boolean} [explode=false]       [description]
   * @param  {Object}  [headers={}]          [description]
   * @param  {String}  [style=''}]           [description]
   */
  constructor({ allowReserved = false, contentType = '', explode = false, headers = {}, style = '' } = {}): void {
    this.allowReserved = allowReserved;
    this.contentType = contentType;
    this.explode = explode;
    this.headers = new Headers(headers);
    this.style = style;
  }
}

/**
 * [encodings description]
 * @type {[type]}
 */
export default class Encodings {
  encodings: Object<string, Encoding> = {};

  /**
   * [definitions description]
   * @type {[type]}
   */
  constructor(definitions: Object<string, Object> = {}): void {
    for (const [key: string, definition: Object] of definitions.entries()) {
      this.encodings[key] = new Encoding(definition);
    }
  }
}
