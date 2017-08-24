import MediaTypes from './mediaTypes';

type InEnum = 'cookie' | 'header' | 'path' | 'query';

/**
 * [allowEmptyValues description]
 * @type {[type]}
 */
export class Parameter {
  // Sets the ability to pass empty-valued parameters.  This is valid only for query parameters and allows sending a
  // parameter with an empty value. Default value is false. If style is used, and if behavior is N/A
  // (cannot be serialized), the value of allowEmptyValue SHALL be ignored.
  allowEmptyValues: boolean;
  // Determines whether the parameter value SHOULD allow reserved characters, as defined by RFC3986 :/?#[]@!$&'()*+,;=
  // to be included without percent-encoding. This property only applies to parameters with an in value of query. The
  // default value is false.
  allowReserved: boolean;
  // A map containing the representations for the parameter. The key is the media type and the value describes it.
  // The map MUST only contain one entry.
  content: MediaType;
  // Specifies that a parameter is deprecated and SHOULD be transitioned out of usage.
  deprecated: boolean;
  // A brief description of the parameter. This could contain examples of use. CommonMark syntax MAY be used for rich
  // text representation.
  description: string;
  // When this is true, parameter values of type array or object generate separate parameters for each value of the
  // array or key-value pair of the map. For other types of parameters this property has no effect. When style is form,
  // the default value is true. For all other styles, the default value is false.
  explode: boolean;
  // Required
  // The location of the parameter. Possible values are "query", "header", "path" or "cookie".
  in: InEnum;
  // Required
  // Parameter names are case sensitive.
  // - If in is "path", the name field MUST correspond to the associated path segment from the path field in the Paths
  // Object. See Path Templating for further information.
  // - If in is "header" and the name field is "Accept", "Content-Type" or "Authorization", the parameter definition
  // SHALL be ignored.
  // - For all other cases, the name corresponds to the parameter name used by the in property.
  name: string;
  // Determines whether this parameter is mandatory. If the parameter location is "path", this property is REQUIRED and
  // its value MUST be true. Otherwise, the property  MAY be included and its default value is false.
  required: boolean;
  // The schema defining the type used for the parameter.
  schema: Schema;
  // Describes how the parameter value will be serialized depending on the type of the parameter value. Default values
  // (based on value of in): for query - form; for path - simple; for header - simple; for cookie - form.
  // TODO Refer to the 'Style Values' for validation here -
  // may need a Class (https://swagger.io/specification/#componentsObject)
  style: string;

  /**
   * [allowEmptyValues description]
   * @type {Boolean}
   */
  constructor(
    {
      allowEmptyValues = false,
      allowReserved = false,
      content,
      deprecated = false,
      description = '',
      explode = false, // except default true when style === 'form'
      in: inArg = '',
      name,
      required = false,
      schema = {},
      style = ''
    } = {}
  ): void {
    this.allowEmptyValues = allowEmptyValues;
    this.allowReserved = allowReserved;
    this.content = new MediaTypes(content);
    this.decprecated = deprecated;
    this.description = description;
    this.explode = explode;
    this.in = inArg;
    this.name = name;
    this.required = required;
    this.schema = schema;
    this.style = style;
  }
}

/**
 * [parameters description]
 * @type {[type]}
 */
export default class Parameters {
  parameters: Array<Parameter> = [];

  /**
   * [definitions description]
   * @type {[type]}
   */
  constructor(definitions: Array<Object> = []): void {
    this.parameters = definitions.map((definition: Object) => {
      return new Parameter(definition);
    });
  }
}
