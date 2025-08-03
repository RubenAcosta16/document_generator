import { TemplatesGeneratorNotFoundError } from "../domain/errors";
import { TemplateGeneratorId } from "../domain/props/TemplateGeneratorId";
import { TemplateGeneratorDbRepository } from "../domain/repository/TemplateGeneratorDbRepository";
import { TemplatesGenerator } from "../domain/TemplatesGenerator";

export class TemplateGeneratorGetById {
  constructor(private repository: TemplateGeneratorDbRepository) {}

  async run(id: string): Promise<TemplatesGenerator> {
    const template = await this.repository.getTemplateById(
      new TemplateGeneratorId(id)
    );

    if (!template)
      throw new TemplatesGeneratorNotFoundError("Template Not Found");

    return template;
  }
}
