// import { roles } from '../UserTypes';

import { UserId } from "../../User/domain/Props/UserId";
import { TemplateNotFoundError } from "../domain/errors";
import { TemplateId } from "../domain/props/TemplateId";
import { TemplateGeneratorDbRepository } from "../domain/repository/TemplateGeneratorDbRepository";
import { TemplateGeneratorUtilsRepository } from "../domain/repository/TemplateGeneratorUtilsRepository";
import { Variable } from "../domain/types";

export class ExtractVariablesFromDocx {
  constructor(
    private templateGeneratorDbRepository: TemplateGeneratorDbRepository,
    private templateGeneratorUtilsRepository: TemplateGeneratorUtilsRepository
  ) {}

  /**
   * This TypeScript function retrieves variables from a template based on the template ID and user ID.
   * @param {string} templateId - The `templateId` parameter is a string that represents the unique
   * identifier of a template in the system.
   * @param {string} userId - The `userId` parameter is a string that represents the unique identifier
   * of a user. It is used to identify the user for whom the template is being accessed or processed.
   * @returns The function `run` returns a Promise that resolves to an array of `Variable` objects.
   */
  async run(templateId: string, userId: string): Promise<Variable[]> {
    const foundTemplate =
      await this.templateGeneratorDbRepository.getTemplateById(
        new TemplateId(templateId)
      );
    if (!foundTemplate)
      throw new TemplateNotFoundError("Template Not Found");

    if (foundTemplate.userId.value !== new UserId(userId).value) {
      throw new TemplateNotFoundError(
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
