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

  async getAllTemplates(
    userId: UserId,
    page?: number,
    limit?: number
  ): Promise<Template[]> {
    // Filtrar solo las plantillas del usuario
    const templateList = this.templates.filter(
      (t) => t.userId.value === userId.value
    );

    // Si no se pasan page y limit, devolver todo
    if (page === undefined || limit === undefined) {
      return templateList;
    }

    // Calcular offset
    const offset = (page - 1) * limit;

    // Devolver el segmento correspondiente
    return templateList.slice(offset, offset + limit);
  }

  async getTemplateById(id: TemplateId): Promise<Template | null> {
    const template = this.templates.find((t) => t.id.value === id.value);
    return template || null;
  }

  async deleteTemplateById(id: TemplateId, userId: UserId): Promise<void> {
    this.templates = this.templates.filter(
      (template) =>
        template.id.value !== id.value && template.userId.value === userId.value
    );
  }
}
