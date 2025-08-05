import { UserNotFoundError } from "../../User/domain/errors";
import { UserId } from "../../User/domain/Props/UserId";
import { UserRepository } from "../../User/domain/UserRepository";
import { TemplateGeneratorDbRepository } from "../domain/repository/TemplateGeneratorDbRepository";
import { Template } from "../domain/Template";

export class TemplateGeneratorGetAll {
  constructor(
    private repository: TemplateGeneratorDbRepository,
    private userRepository: UserRepository
  ) {}

/**
 * The function `run` retrieves all templates for a given user ID after checking if the user exists.
 * @param {string} userId - The `run` function takes a `userId` parameter of type string. This function
 * is an asynchronous function that returns a Promise of an array of `Template` objects.
 * @returns An array of Template objects is being returned.
 */
  async run(userId: string): Promise<Template[]> {
    const userIdClass = new UserId(userId);
    const foundUser = await this.userRepository.findById(userIdClass);
    if (!foundUser) throw new UserNotFoundError("User Not Found");

    return await this.repository.getAllTemplates(userIdClass);
  }
}
