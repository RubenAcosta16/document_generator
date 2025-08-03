// import { roles } from '../UserTypes';

import { UserId } from "../../User/domain/Props/UserId";
import { TemplatesGeneratorNotFoundError } from "../domain/errors";
import { TemplateGeneratorId } from "../domain/props/TemplateGeneratorId";
import { TemplateGeneratorDbRepository } from "../domain/repository/TemplateGeneratorDbRepository";
import { TemplateGeneratorUtilsRepository } from "../domain/repository/TemplateGeneratorUtilsRepository";
import { Variable } from "../domain/types";

export class ExtractVariablesFromDocx {
  constructor(
    private templateGeneratorDbRepository: TemplateGeneratorDbRepository,
    private templateGeneratorUtilsRepository: TemplateGeneratorUtilsRepository
  ) {}

  async run(templateId: string, userId: string): Promise<Variable[]> {
    const foundTemplate =
      await this.templateGeneratorDbRepository.getTemplateById(
        new TemplateGeneratorId(templateId)
      );
    if (!foundTemplate)
      throw new TemplatesGeneratorNotFoundError("Template Not Found");

    if (foundTemplate.userId.value !== new UserId(userId).value) {
      throw new TemplatesGeneratorNotFoundError(
        "Template Not Found for this user"
      );
    }

    const variables =
      await this.templateGeneratorUtilsRepository.extractVariablesFromDocx(
        foundTemplate.content
      );

    return variables;
  }
}
