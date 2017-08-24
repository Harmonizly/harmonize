import SpecificationExtension from './specificationExtensions';

const SPECIFICATION_EXTESNION_MATCH: RegExp = new RegExp(/^x-.*/, 'g');

/**
 *
 */
export default class OpenApiSchema {

  /**
   * [constructor description]
   * @param  {[type]} definitions [description]
   * @return {[type]}             [description]
   */
  constructor(definitions: Object) {
    // TODO handle $refs?
    let error: Error?;
    let errors: Array<Error> = [];
    let field: Field;

    /**
     * Loop over the provided definitions to apply them to the current schema.
     * If the definition is not in the current schema and the definition is not a Specification Extension (x-*), then
     * record the illegal field. Otherwise, apply the value to the corresponding field object and record any Validation
     * errors
     */
    for (const [key: string, definition: any] of definitions.entries()) {
      if (!(key in this)) {
        // If the key/definition is a Specification Extension, jsut add it to the schema
        // Otherwise, record the illegal definition
        if (this.isSpecificationExtension(key)) {
          this[key] = new Field({ name: key, type: Field.starType });
        } else {
          errors.push(new Error(`Illegal field provided: '${key}'`));
        }
      } else {
        // Apply the definition to the field and record the validation error if one is returned
        error = this[key].set(definition);
        if (error) {
          errors.push(error);
        }
      }
    }

    if (errors.length) {
      // TODO emit errors
    } else {
      // Now that the definitions is nominally valid, validate the state according to the schema state
      errors = this.validateState(this);
      if (errors.length) {
        // TODO emit errors
      }
    }
  }

  /**
   * [key description]
   * @type {[type]}
   */
  isSpecificationExtension(key: string): boolean {
    return SPECIFICATION_EXTESNION_MATCH.test(key);
  }

  /**
   * [validateState description]
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */
  validateState(data: Object): Array<Error> {
    const errors: Array<Error> = [];
    return errors;
  }
}

/**
 * Proxy-like object that provides inbound validation on a Schema field
 */
export class Field {
  default: any;
  name: string;
  required: boolean;
  type: any; // TODO type this better
  value: string;

  static starType: string = 'any';

  /**
   * [constructor description]
   * @param  {[type]} name       [description]
   * @param  {[type]} type       [description]
   * @param  {[type]} defaultArg [description]
   * @return {[type]}            [description]
   */
  constructor({ name, type, required = false, defaultArg = null } = {}): void {
    if (!name || typeof name !== 'string') {
      throw new Error('Name must be a string and is required for rule');
    }

    if (!type) {
      throw new Error('Type must be a string and is required for rule');
    }

    if (typeof required !== 'boolean') {
      throw new Error('Required must be a boolean');
    }

    this.default = defaultArg;
    this.name = name;
    this.required = required;
    this.type = type;
    this.value = defaultArg;
  }

  /**
   * [set description]
   * @param {[type]} input [description]
   */
  set(input: any): Error? {
    let error: Error? = this.validateInput(input);
    if (error) {
      return error;
    }

    if (input) {
      this.value = input;
    }
  }

  /**
   * [validateInput description]
   * @param  {[type]} input [description]
   * @return {[type]}       [description]
   */
  validateInput(input: any): Error? {
    if (this.required && input == null) {
      return new Error(`Field '${this.name}' is required.`);
    }

    // if input is a ref, we still expect the resolution to be the same type
    // input can be a class from this lib or a primitive value
    // if type is a cls, input must be an object
    // if type is a string, input must be a primitive of that type

    const type: string = (typeof input);
    if (this.type !== Field.starType && type !== this.type) {
      return new Error(`Invalid type for field '${this.name}'. Expected '${this.type}' but found '${type}' instead.`);
    }
    return null;
  }

  /**
   * [state description]
   * @type {[type]}
   */
  validateState(state: Object): Error? {
    throw new Error("'validateState' must be implemented");
  }
}
