import { UserNotFoundError } from "../../User/domain/errors";
import { UserId } from "../../User/domain/Props/UserId";
import { UserRepository } from "../../User/domain/UserRepository";
import { TemplateGeneratorDbRepository } from "../domain/repository/TemplateGeneratorDbRepository";
import { TemplatesGenerator } from "../domain/TemplatesGenerator";

export class TemplateGeneratorGetAll {
  constructor(
    private repository: TemplateGeneratorDbRepository,
    private userRepository: UserRepository
  ) {}

  async run(userId: string): Promise<TemplatesGenerator[]> {
    const userIdClass = new UserId(userId);
    const foundUser = await this.userRepository.findById(userIdClass);
    if (!foundUser) throw new UserNotFoundError("User Not Found");

    return await this.repository.getAllTemplates(userIdClass);
  }
}
