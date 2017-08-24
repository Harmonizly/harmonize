import Operation from './operation';
import Parameters from './parameters';
import Servers from './servers';

/**
 * [delete description]
 * @type {[type]}
 */
export class PathItem {
  delete: Operation;
  description: string;
  get: Operation;
  head: Operation;
  options: Operation;
  parameters: Parameters;
  patch: Operation;
  post: Operation;
  put: Operation;
  servers: Servers;
  summary: string;
  trace: Operation;
  $ref: string;

  /**
   * [paths description]
   * @type {[type]}
   */
  constructor(
    {
      delete: deleteArg = {},
      description = '',
      get = {},
      head = {},
      options = {},
      parameters = {},
      patch = {},
      post = {},
      put = {},
      servers = [],
      summary = '',
      trace = {},
      $ref = ''
    } = {}
  ): void {
    this.delete = new Operation(deleteArg);
    this.description = description;
    this.get = new Operation(get);
    this.head = new Operation(head);
    this.options = new Operation(options);
    this.parameters = new Parameters(parameters);
    this.patch = new Operation(patch);
    this.post = new Operation(post);
    this.put = new Operation(put);
    this.servers = new Servers(servers);
    this.summary = summary;
    this.trace = new Operation(trace);
    this.$ref = $ref;
  }
}

/**
 * [definion description]
 * @type {[type]}
 */
export default class Paths {
  paths: Array<PathItem> = [];

  constructor(definitions: Array<Object>): void {
    this.paths = definitions.map((definition: Object) => {
      return new PathItem(definition);
    });
  }
}
