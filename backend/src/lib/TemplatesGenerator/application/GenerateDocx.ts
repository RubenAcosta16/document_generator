import { UserId } from "../../User/domain/Props/UserId";
import {
  TemplatesGeneratorError,
  TemplatesGeneratorNotFoundError,
} from "../domain/errors";
import { TemplateGeneratorId } from "../domain/props/TemplateGeneratorId";
import { TemplateGeneratorDbRepository } from "../domain/repository/TemplateGeneratorDbRepository";
import { TemplateGeneratorUtilsRepository } from "../domain/repository/TemplateGeneratorUtilsRepository";

export class GenerateDocx {
  constructor(
    private templateGeneratorDbRepository: TemplateGeneratorDbRepository,
    private templateGeneratorUtilsRepository: TemplateGeneratorUtilsRepository
  ) {}

  async run(
    templateId: string,
    data: { [key: string]: string },
    userId: string
  ): Promise<Buffer<ArrayBufferLike>> {
    const foundTemplate =
      await this.templateGeneratorDbRepository.getTemplateById(
        new TemplateGeneratorId(templateId)
      );
    if (!foundTemplate)
      throw new TemplatesGeneratorNotFoundError("Template Not Found");

    if (foundTemplate.userId.value !== new UserId(userId).value) {
      throw new TemplatesGeneratorError(
        `Access denied: User does not own template.`
      );
    }

    if (!data) {
      throw new TemplatesGeneratorError("Missing  data in request body.");
    }

    const buf = await this.templateGeneratorUtilsRepository.generateDocx(
      foundTemplate,
      data
    );
    return buf;
  }
}

//   generateDocx(
//     templateId: TemplateGeneratorId,
//     data: { [key: string]: string }
//   ): Promise<Buffer>;
