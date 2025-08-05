import { UserId } from "../../../User/domain/Props/UserId";
import { TemplateId } from "../props/TemplateId";
import { Template } from "../Template";

export interface TemplateGeneratorDbRepository {
  create(template: Template): Promise<void>;
  getAllTemplates(
    userId: UserId,
    page?: number,
    limit?: number
  ): Promise<Template[]>;
  getTemplateById(id: TemplateId): Promise<Template | null>;
  deleteTemplateById(id: TemplateId, userId: UserId): Promise<void>;
}
