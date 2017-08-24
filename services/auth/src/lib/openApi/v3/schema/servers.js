/**
 * [description description]
 * @type {[type]}
 */
export class ServerVariable {
  default: string; // required
  description: string;
  enum: string;

  /**
   * [description description]
   * @type {String}
   */
  constructor({ default: defaultArg, description = '', enum: enumArg = '' } = {}): void {
    this.default = defaultArg;
    this.description = description;
    this.enum = enumArg;
  }
}

/**
 * [description description]
 * @type {[type]}
 */
export class Server {
  description: string;
  url: string; // required
  variables: Object<string, ServerVariable>;

  /**
   * [constructor description]
   * @param  {[type]} definition [description]
   * @return {[type]}            [description]
   */
  constructor({ description = '', url, variables = {} } = {}): void {
    this.description = description;
    this.url = url;

    for (const [key: string, variable: Object] of variables.entries()) {
      this.variables[key] = new ServerVariable(variable);
    }
  }
}

/**
 * [definion description]
 * @type {[type]}
 */
export default class Servers {
  servers: Array<Server> = [];

  /**
   * [definion description]
   * @type {[type]}
   */
  constructor(definions: Array<Object> = []): void {
    // TODO validate. If no servers exist, use default
    this.servers = definions.map((definition: Object) => {
      return new Server(definition);
    });
  }
}
