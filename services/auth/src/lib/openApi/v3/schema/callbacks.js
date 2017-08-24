import { Path } from './paths';

/**
 * [headers description]
 * @type {[type]}
 */
export default class Callbacks {
  callbacks: Object<string, Path> = {};

  constructor(definitions: Object<string, Object>): void {
    for (const [key: string, definition: Object] of definitions.entries()) {
      this.callbacks[key] = new Path(definition);
    }
  }
}
