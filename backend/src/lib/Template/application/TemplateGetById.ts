import { TemplateNotFoundError } from "../domain/errors";
import { TemplateId } from "../domain/props/TemplateId";
import { TemplateGeneratorDbRepository } from "../domain/repository/TemplateGeneratorDbRepository";
import { Template } from "../domain/Template";

export class TemplateGetById {
  constructor(private repository: TemplateGeneratorDbRepository) {}

/**
 * This TypeScript function asynchronously retrieves a template by ID and throws an error if the
 * template is not found.
 * @param {string} id - The `id` parameter is a string that represents the unique identifier of a
 * template.
 * @returns The `run` function is returning a `Template` object.
 */
  async run(id: string): Promise<Template> {
    const template = await this.repository.getTemplateById(
      new TemplateId(id)
    );

    if (!template)
      throw new TemplateNotFoundError("Template Not Found");

    return template;
  }
}
