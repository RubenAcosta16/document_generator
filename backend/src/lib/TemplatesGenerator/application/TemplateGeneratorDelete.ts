import { UserId } from "../../User/domain/Props/UserId";
import { TemplatesGeneratorNotFoundError } from "../domain/errors";
import { TemplateGeneratorId } from "../domain/props/TemplateGeneratorId";
import { TemplateGeneratorDbRepository } from "../domain/repository/TemplateGeneratorDbRepository";

export class TemplateGeneratorDelete {
  constructor(private repository: TemplateGeneratorDbRepository) {}

  async run(id: string, userId: string): Promise<void> {
    const templateFound = await this.repository.getTemplateById(
      new TemplateGeneratorId(id)
    );
    if (!templateFound)
      throw new TemplatesGeneratorNotFoundError("Template Not Found");

    await this.repository.deleteTemplateById(
      new TemplateGeneratorId(id),
      new UserId(userId)
    );
  }
}
