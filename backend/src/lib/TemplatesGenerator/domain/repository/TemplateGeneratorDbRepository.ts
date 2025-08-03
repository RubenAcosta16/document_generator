import { UserId } from "../../../User/domain/Props/UserId";
import { TemplateGeneratorId } from "../props/TemplateGeneratorId";
import { TemplatesGenerator } from "../TemplatesGenerator";

export interface TemplateGeneratorDbRepository {
  create(template: TemplatesGenerator): Promise<void>;
  getAllTemplates(userId: UserId): Promise<TemplatesGenerator[]>;
  getTemplateById(id: TemplateGeneratorId): Promise<TemplatesGenerator | null>;
  deleteTemplateById(id: TemplateGeneratorId,userId:UserId): Promise<void>;
}
