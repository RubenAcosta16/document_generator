import { UserId } from "../../User/domain/Props/UserId";
import {
  TemplateError,
  TemplateNotFoundError,
} from "../domain/errors";
import { TemplateId } from "../domain/props/TemplateId";
import { TemplateGeneratorDbRepository } from "../domain/repository/TemplateGeneratorDbRepository";
import { TemplateGeneratorUtilsRepository } from "../domain/repository/TemplateGeneratorUtilsRepository";


export class GenerateDocx {
  constructor(
    private templateGeneratorDbRepository: TemplateGeneratorDbRepository,
    private templateGeneratorUtilsRepository: TemplateGeneratorUtilsRepository
  ) {}

  /**
   * This TypeScript function takes in a template ID, data object, and user ID, retrieves a template
   * from a database, checks ownership, generates a DOCX file using the template and data, and returns
   * the file as a Buffer.
   * @param {string} templateId - The `templateId` parameter is a string that represents the unique
   * identifier of a template that you want to use for generating a document.
   * @param data - The `data` parameter in the `run` function is an object that contains key-value
   * pairs where the keys are strings and the values are also strings. This data is used as input to
   * generate a DOCX file based on the template specified by `templateId`.
   * @param {string} userId - The `userId` parameter in the `run` function represents the unique
   * identifier of the user who is trying to access and generate a document using a specific template.
   * This parameter is used to verify if the user has the necessary permissions to access and use the
   * template. If the user does not own the template
   * @returns A Promise that resolves to a Buffer containing an ArrayBuffer-like object.
   */
  async run(
    templateId: string,
    data: { [key: string]: string },
    userId: string
  ): Promise<Buffer<ArrayBufferLike>> {
    const foundTemplate =
      await this.templateGeneratorDbRepository.getTemplateById(
        new TemplateId(templateId)
      );
    if (!foundTemplate)
      throw new TemplateNotFoundError("Template Not Found");

    if (foundTemplate.userId.value !== new UserId(userId).value) {
      throw new TemplateError(
        `Access denied: User does not own template.`
      );
    }

    if (!data) {
      throw new TemplateError("Missing  data in request body.");
    }

    const buf = await this.templateGeneratorUtilsRepository.generateDocx(
      foundTemplate,
      data
    );
    return buf;
  }
}
