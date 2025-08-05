import { UserId } from "../../User/domain/Props/UserId";
import { TemplateId } from "../domain/props/TemplateId";
import { TemplateGeneratorDbRepository } from "../domain/repository/TemplateGeneratorDbRepository";
import { Template } from "../domain/Template";

export class InMemoryDbTemplateGenerator
  implements TemplateGeneratorDbRepository
{
  templates: Template[] = [];

  async create(template: Template): Promise<void> {
    this.templates.push(template);
  }

  async getAllTemplates(userId: UserId): Promise<Template[]> {
    const templateList = this.templates.filter(
      (t) => t.userId.value === userId.value
    );
    return templateList;
  }

  async getTemplateById(
    id: TemplateId
  ): Promise<Template | null> {
    const template = this.templates.find((t) => t.id.value === id.value);
    return template || null;
  }
 
  async deleteTemplateById(
    id: TemplateId,
    userId: UserId
  ): Promise<void> {
    this.templates = this.templates.filter(
      (template) =>
        template.id.value !== id.value && template.userId.value === userId.value
    );
  }
}
