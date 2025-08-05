import { UserId } from "../../User/domain/Props/UserId";
import { TemplateNotFoundError } from "../domain/errors";
import { TemplateId } from "../domain/props/TemplateId";
import { TemplateGeneratorDbRepository } from "../domain/repository/TemplateGeneratorDbRepository";

export class TemplateDelete {
  constructor(private repository: TemplateGeneratorDbRepository) {}

/**
 * The function `run` deletes a template by its ID after checking if it exists.
 * @param {string} id - The `id` parameter is a string that represents the identifier of a template
 * that needs to be deleted.
 * @param {string} userId - The `userId` parameter in the `run` function is a string that represents
 * the unique identifier of the user who is executing the function. It is used to specify which user is
 * performing the operation within the function.
 */
  async run(id: string, userId: string): Promise<void> {
    const templateFound = await this.repository.getTemplateById(
      new TemplateId(id)
    );
    if (!templateFound)
      throw new TemplateNotFoundError("Template Not Found");

    await this.repository.deleteTemplateById(
      new TemplateId(id),
      new UserId(userId)
    );
  }
}
