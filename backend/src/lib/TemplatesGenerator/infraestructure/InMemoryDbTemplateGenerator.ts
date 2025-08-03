import { UserId } from "../../User/domain/Props/UserId";
import { TemplateGeneratorId } from "../domain/props/TemplateGeneratorId";
import { TemplateGeneratorDbRepository } from "../domain/repository/TemplateGeneratorDbRepository";
import { TemplatesGenerator } from "../domain/TemplatesGenerator";

export class InMemoryDbTemplateGenerator
  implements TemplateGeneratorDbRepository
{
  templates: TemplatesGenerator[] = [];

  async create(template: TemplatesGenerator): Promise<void> {
    this.templates.push(template);
  }

  async getAllTemplates(userId: UserId): Promise<TemplatesGenerator[]> {
    const templateList = this.templates.filter(
      (t) => t.userId.value === userId.value
    );
    return templateList;
  }

  async getTemplateById(
    id: TemplateGeneratorId
  ): Promise<TemplatesGenerator | null> {
    const template = this.templates.find((t) => t.id.value === id.value);
    return template || null;
  }
 
  async deleteTemplateById(
    id: TemplateGeneratorId,
    userId: UserId
  ): Promise<void> {
    this.templates = this.templates.filter(
      (template) =>
        template.id.value !== id.value && template.userId.value === userId.value
    );
  }
}
