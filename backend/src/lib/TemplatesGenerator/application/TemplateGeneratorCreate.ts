// import { roles } from '../UserTypes';

import { UserNotFoundError } from "../../User/domain/errors";
import { UserId } from "../../User/domain/Props/UserId";
import { UserRepository } from "../../User/domain/UserRepository";
import { TemplateGeneratorFilename } from "../domain/props/TemplateGeneratorFilename";
import { TemplateGeneratorId } from "../domain/props/TemplateGeneratorId";
import { TemplateGeneratorDbRepository } from "../domain/repository/TemplateGeneratorDbRepository";
import { TemplateGeneratorUtilsRepository } from "../domain/repository/TemplateGeneratorUtilsRepository";
// import { TemplateGeneratorUtilsRepository } from "../domain/repository/TemplateGeneratorUtilsRepository";
import { TemplatesGenerator } from "../domain/TemplatesGenerator";

export class TemplateGeneratorCreate {
  constructor(
    private templateGeneratorDbRepository: TemplateGeneratorDbRepository,
    private templateGeneratorUtilsRepository: TemplateGeneratorUtilsRepository,
    private userRepository: UserRepository
  ) {}

  async run(
    filename: Express.Multer.File,
    content: Buffer,
    userId: string
  ): Promise<TemplatesGenerator> {
    const foundUser = await this.userRepository.findById(new UserId(userId));
    if (!foundUser) throw new UserNotFoundError("User Not Found");

    const newTemplate = new TemplatesGenerator(
      new TemplateGeneratorId(
        this.templateGeneratorUtilsRepository.generateId()
      ),
      new TemplateGeneratorFilename(filename.originalname),
      content,
      new UserId(userId)
    );
    // return await this.TemplateGeneratorUtilsRepository.createTemplate()

    await this.templateGeneratorDbRepository.create(newTemplate);
    return newTemplate;
  }
}
