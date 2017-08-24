import { Server } from './servers';

/**
 *
 */
export class Link {
  operationRef: string;
  operationId: string;
  parameters: Object;
  requestBody: string;
  description: string;
  server: Server;

  constructor(
    { operationRef = '', operationId = '', parameters = {}, requestBody = '', description = '', server = {} } = {}
  ): void {
    this.operationRef = operationRef;
    this.operationId = operationId;
    this.parameters = parameters;
    this.requestBody = requestBody;
    this.description = description;
    this.server = new Server(server);
  }
}

/**
 * [allowReserved description]
 * @type {[type]}
 */
export default class Links {
  links: Object<string, Link> = {};

  constructor(definitions: Object<string, Object> = {}): void {
    for (const [key: string, definition: Object] of definitions.entries()) {
      this.links[key] = new Link(definition);
    }
  }
}
