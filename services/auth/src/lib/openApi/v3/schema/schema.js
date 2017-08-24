import DataType from '../dataTypes';
import Discriminator from './discriminator';
import ExternalDocumentation from './externalDocs';
import OpenApiSchema from './index.js';
import Reference from './reference';
import XML from './xml';

/**
 * The Schema Object allows the definition of input and output data types. These types can be objects, but also
 * primitives and arrays. This object is an extended subset of the JSON Schema Specification Wright Draft 00.
 *
 * For more information about the properties, see JSON Schema Core and JSON Schema Validation. Unless stated otherwise,
 * the property definitions follow the JSON Schema.
 *
 * Alternatively, any time a Schema Object can be used, a Reference Object can be used in its place. This allows
 * referencing definitions instead of defining them inline.
 *
 * Additional properties defined by the JSON Schema specification that are not mentioned here are strictly unsupported.
 */
export default class Schema extends OpenApiSchema {
  /** /////////////////////////////////////////////////////////////////////////
   * BEGIN JSON Schema Properties
   *
   * The following properties are taken directly from the JSON Schema definition and follow the same specifications:
   * /////////////////////////////////////////////////////////////////////// */

  // The value of this keywords MUST be a string.
  //
  // A title will preferrably be short.
  title: string = '';

  // The value of "multipleOf" MUST be a number, strictly greater than 0.
  //
  // A numeric instance is only valid if division by this keyword's value results in an integer.
  multipleOf: number = Number.MAX_VALUE;

  // The value of "maximum" MUST be a number, representing an upper limit for a numeric instance.
  //
  // If the instance is a number, then this keyword validates if "exclusiveMaximum" is true and instance is less than
  // the provided value, or else if the instance is less than or exactly equal to the provided value.
  maximum: number = Number.MAX_VALUE;

  // The value of "exclusiveMaximum" MUST be a boolean, representing whether the limit in "maximum" is exclusive or not.
  // An undefined value is the same as false.
  //
  // If "exclusiveMaximum" is true, then a numeric instance SHOULD NOT be equal to the value specified in "maximum".
  // If "exclusiveMaximum" is false (or not specified), then a numeric instance MAY be equal to the value of "maximum".
  exclusiveMaximum: boolean = false;

  // The value of "minimum" MUST be a number, representing a lower limit for a numeric instance.
  //
  // If the instance is a number, then this keyword validates if "exclusiveMinimum" is true and instance is greater than
  // the provided value, or else if the instance is greater than or exactly equal to the provided value.
  minimum: number = 0;

  // The value of "exclusiveMinimum" MUST be a boolean, representing whether the limit in "minimum" is exclusive or not.
  // An undefined value is the same as false.
  //
  // If "exclusiveMinimum" is true, then a numeric instance SHOULD NOT be equal to the value specified in "minimum".
  // If "exclusiveMinimum" is false (or not specified), then a numeric instance MAY be equal to the value of "minimum".
  exclusiveMinimum: boolean = false;

  // The value of this keyword MUST be a non-negative integer.
  //
  // The value of this keyword MUST be an integer. This integer MUST be greater than, or equal to, 0.
  //
  // A string instance is valid against this keyword if its length is less than, or equal to, the value of this keyword.
  //
  // The length of a string instance is defined as the number of its characters as defined by RFC 7159 [RFC7159].
  maxLength: number = Number.MAX_VALUE;

  // A string instance is valid against this keyword if its length is greater than, or equal to, the value of this
  // keyword.
  //
  // The length of a string instance is defined as the number of its characters as defined by RFC 7159 [RFC7159].
  //
  // The value of this keyword MUST be an integer. This integer MUST be greater than, or equal to, 0.
  //
  // "minLength", if absent, may be considered as being present with integer value 0.
  minLength: number = 0;

  // The original value of this keyword MUST be a string. This string SHOULD be a valid regular expression, according
  // to the ECMA 262 regular expression dialect.
  //
  // A string instance is considered valid if the regular expression matches the instance successfully. Recall: regular
  // expressions are not implicitly anchored.
  pattern: RegExp = null;

  // The value of this keyword MUST be an integer. This integer MUST be greater than, or equal to, 0.
  //
  // An array instance is valid against "maxItems" if its size is less than, or equal to, the value of this keyword.
  maxItems: number = Number.MAX_VALUE;

  // The value of this keyword MUST be an integer. This integer MUST be greater than, or equal to, 0.
  //
  // An array instance is valid against "minItems" if its size is greater than, or equal to, the value of this keyword.
  //
  // If this keyword is not present, it may be considered present with a value of 0.
  minItems: number = 0;

  // The value of this keyword MUST be a boolean.
  //
  // If this keyword has boolean value false, the instance validates successfully. If it has boolean value true, the
  // instance validates successfully if all of its elements are unique.
  //
  // If not present, this keyword may be considered present with boolean value false.
  uniqueItems: boolean = false;

  // The value of this keyword MUST be an integer. This integer MUST be greater than, or equal to, 0.

  // An object instance is valid against "maxProperties" if its number of properties is less than, or equal to, the
  // value of this keyword.
  maxProperties: number = Number.MAX_VALUE;

  // The value of this keyword MUST be an integer. This integer MUST be greater than, or equal to, 0.
  //
  // An object instance is valid against "minProperties" if its number of properties is greater than, or equal to, the
  // value of this keyword.
  //
  // If this keyword is not present, it may be considered present with a value of 0.
  minProperties: number = 0;

  // The value of this keyword MUST be an array. This array MUST have at least one element. Elements of this array
  // MUST be strings, and MUST be unique.
  //
  // An object instance is valid against this keyword if its property set contains all elements in this keyword's array
  // value.
  required: Array<string> = [];

  // The value of this keyword MUST be an array. This array SHOULD have at least one element. Elements in the array
  // SHOULD be unique.
  //
  // Elements in the array MAY be of any type, including null.
  //
  // An instance validates successfully against this keyword if its value is equal to one of the elements in this
  // keyword's array value.
  enum: Array<any> = [];

  /** /////////////////////////////////////////////////////////////////////////
   * END JSON Schema Properties
   * /////////////////////////////////////////////////////////////////////// */

  /** /////////////////////////////////////////////////////////////////////////
   * BEGIN OpenAPI Properties
   *
   * The following properties are taken from the JSON Schema definition but their definitions were adjusted to the
   * OpenAPI Specification:
   * /////////////////////////////////////////////////////////////////////// */

  // Value MUST be a string. Multiple types via an array are not supported.
  type: string = '';

  // Inline or referenced schema MUST be of a Schema Object and not a standard JSON Schema.
  allOf: Array<Schema | Reference> = [];

  // Inline or referenced schema MUST be of a Schema Object and not a standard JSON Schema.
  oneOf: Array<Schema | Reference> = [];

  // Inline or referenced schema MUST be of a Schema Object and not a standard JSON Schema.
  anyOf: Array<Schema | Reference> = [];

  // Inline or referenced schema MUST be of a Schema Object and not a standard JSON Schema.
  not: Array<Schema | Reference> = [];

  // Value MUST be an object and not an array. Inline or referenced schema MUST be of a Schema Object and not a
  // standard JSON Schema. items MUST be present if the type is array.
  items: Schema | Reference = {};

  // Property definitions MUST be a Schema Object and not a standard JSON Schema (inline or referenced).
  // additionalProperties - Value can be boolean or object. Inline or referenced schema MUST be of a Schema Object and
  // not a standard JSON Schema.
  properties: Object<string, Schema | Reference> = {};

  // CommonMark syntax MAY be used for rich text representation.
  description: string;

  // See Data Type Formats for further details. While relying on JSON Schema's defined formats, the OAS offers
  // a few additional predefined formats.
  format: DataType = '';

  // The default value represents what would be assumed by the consumer of the input as the value of the schema if one
  // is not provided. Unlike JSON Schema, the value MUST conform to the defined type for the Schema Object defined at
  // the same level. For example, if type is string, then default can be "foo" but cannot be 1.
  default: any = null;

  /** /////////////////////////////////////////////////////////////////////////
   * END OpenAPI Properties
   * /////////////////////////////////////////////////////////////////////// */

  /** /////////////////////////////////////////////////////////////////////////
   * BEGIN Fixed Fields
   *
   * Other than the JSON Schema subset fields, the following fields MAY be used for further schema documentation:
   * /////////////////////////////////////////////////////////////////////// */

  // Specifies that a schema is deprecated and SHOULD be transitioned out of usage. Default value is false
  deprecated: boolean = false;

  // Adds support for polymorphism. The discriminator is an object name that is used to differentiate between other
  // schemas which may satisfy the payload description. See Composition and Inheritance for more details.
  discriminator: Discriminator = {};

  // Additional external documentation for this schema
  externalDocs: ExternalDocumentation = {};

  // Allows sending a null value for the defined schema. Default value is false.
  nullable: boolean = false;

  // Specifies that a schema is deprecated and SHOULD be transitioned out of usage. Default value is false.
  // Relevant only for Schema "properties" definitions. Declares the property as "read only". This means that it MAY be
  // sent as part of a response but SHOULD NOT be sent as part of the request. If the property is marked as readOnly
  // being true and is in the required list, the required will take effect on the response only. A property MUST NOT be
  // marked as both readOnly and writeOnly being true. Default value is false
  readOnly: boolean = false;

  // Relevant only for Schema "properties" definitions. Declares the property as "write only". Therefore, it MAY be
  // sent as part of a request but SHOULD NOT be sent as part of the response. If the property is marked as writeOnly
  // being true and is in the required list, the required will take effect on the request only. A property MUST NOT be
  // marked as both readOnly and writeOnly being true. Default value is false.
  writeOnly: boolean = false;

  // This MAY be used only on properties schemas. It has no effect on root schemas. Adds additional metadata to describe
  // the XML representation of this property.
  xml: XML = {};

  /** /////////////////////////////////////////////////////////////////////////
   * END Fixed Fields
   * /////////////////////////////////////////////////////////////////////// */
}

/**
 * [callbacks description]
 * @type {[type]}
 */
export class Schemas {
  schemas: Object<string, Schema> = {};

  /**
   * [constructor description]
   * @param  {[type]} definitions [description]
   * @return {[type]}             [description]
   */
  constructor(definitions: Object<string, Object> = {}): void {
    for (const [key: string, definition: Object] of definitions.entries()) {
      this.schemas[key] = new Schema(definition);
    }
  }
}
