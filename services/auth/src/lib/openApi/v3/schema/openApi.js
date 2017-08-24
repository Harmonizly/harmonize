import Components from './components';
import Info from './info';
import Paths from './paths';
import SecurityRequirement from './security';
import Servers from './servers';
import Tags from './tags';

/**
 * [definition description]
 * @type {[type]}
 */
export default class OpenApi {
  components: Components;
  info: Info; // required
  openapi: string; // required
  paths: Paths; // required
  security: SecurityRequirement;
  servers: Servers;
  tags: Tags;

  /**
   * [definition description]
   * @type {[type]}
   */
  constructor(definition: Object): void {
    // Always ensure that Components are populated and validated first so that '$ref's later on can be validated
    this.components = new Components(definition.components);

    // Populate and validate the remaining schema
    this.info = new Info(definition.info);
    this.openapi = definition.openapi;
    this.paths = new Paths(definition.paths);
    this.security = new SecurityRequirement(definition.security);
    this.servers = new Servers(definition.servers);
    this.tags = new Tags(definition.tags);
  }
}
