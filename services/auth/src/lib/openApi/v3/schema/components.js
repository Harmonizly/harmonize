import Callbacks from './callbacks';
import ExternalDocumentation from './externalDocs';
import Headers from './headers';
import Links from './links';
import Parameters from './parameters';
import Responses from './responses';
import { RequestBodies } from './requestBody';
import { Schemas } from './schema';
import { SecuritySchemes } from './security';

/**
 * [definion description]
 * @type {[type]}
 */
export default class Components {
  callbacks: Callbacks;
  externalDocs: ExternalDocumentation;
  headers: Headers;
  links: Links;
  parameters: Parameters;
  responses: Responses;
  requestBodies: RequestBodies;
  schemas: Schemas;
  securitySchemes: SecuritySchemes;

  /**
   *
   */
  constructor(
    {
      callbacks = {},
      externalDocs = {},
      headers = {},
      links = {},
      parameters = {},
      responses = {},
      requestBodies = {},
      schemas = {},
      securitySchemes = {}
    } = {}
  ): void {
    this.callbacks = new Callbacks(callbacks);
    this.externalDocs = new ExternalDocumentation(externalDocs);
    this.headers = new Headers(headers);
    this.links = new Links(links);
    this.parameters = new Parameters(parameters);
    this.responses = new Responses(responses);
    this.requestBodies = new RequestBodies(requestBodies);
    this.schemas = new Schemas(schemas);
    this.securitySchemes = new SecuritySchemes(securitySchemes);
  }
}
