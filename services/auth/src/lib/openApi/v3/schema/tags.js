import ExternalDocumentation from './externalDocs';

/**
 *
 */
export class Tag {
  // A short description for the tag. CommonMark syntax MAY be used for rich text representation.
  description: string;
  // Additional external documentation for this tag.
  externalDocs: ExternalDocumentation;
  // Required.
  // The name of the tag
  name: string;

  /**
   * [description description]
   * @type {String}
   */
  constructor({ description = '', externalDocs = {}, name } = {}): void {
    this.description = description;
    this.externalDocs = new ExternalDocumentation(externalDocs);
    this.name = name;
  }
}

/**
 *
 */
export default class Tags {
  tags: Array<Tag> = [];

  /**
   * [definitions description]
   * @type {[type]}
   */
  constructor(definitions: Array<Object> = []): void {
    this.tags = definitions.map((definition) => {
      return new Tag(definition);
    });
  }
}
