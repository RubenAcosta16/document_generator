// import { roles } from '../UserTypes';

import { UserNotFoundError } from "../../User/domain/errors";
import { UserId } from "../../User/domain/Props/UserId";
import { UserRepository } from "../../User/domain/UserRepository";
import { TemplateFilename } from "../domain/props/TemplateFilename";
import { TemplateId } from "../domain/props/TemplateId";
import { TemplateGeneratorDbRepository } from "../domain/repository/TemplateGeneratorDbRepository";
import { TemplateGeneratorUtilsRepository } from "../domain/repository/TemplateGeneratorUtilsRepository";
// import { TemplateGeneratorUtilsRepository } from "../domain/repository/TemplateGeneratorUtilsRepository";
import { Template } from "../domain/Template";

export class TemplateCreate {
  constructor(
    private templateGeneratorDbRepository: TemplateGeneratorDbRepository,
    private templateGeneratorUtilsRepository: TemplateGeneratorUtilsRepository,
    private userRepository: UserRepository
  ) {}

  /**
   * This TypeScript function takes in a file, content, and user ID, retrieves the user, creates a new
   * template generator object, and saves it to the database.
   * @param filename - The `filename` parameter is of type Express.Multer.File, which typically
   * represents a file uploaded via a form. It contains information about the uploaded file such as the
   * original name, size, mimetype, and buffer containing the file data.
   * @param {Buffer} content - The `content` parameter in the `run` function is of type `Buffer`. It is
   * used to store binary data, such as the contents of a file being uploaded. In this case, it is
   * being passed along with other parameters to create a new template in the `Template`
   * class.
   * @param {string} userId - The `userId` parameter in the `run` function is a string that represents
   * the unique identifier of the user for whom the template is being generated. It is used to retrieve
   * the user from the database before creating a new template for that user.
   * @returns The `run` function is returning a `Template` object after creating a new
   * template and saving it to the database.
   */
  async run(
    filename: Express.Multer.File,
    content: Buffer,
    userId: string
  ): Promise<Template> {
    const foundUser = await this.userRepository.findById(new UserId(userId));
    if (!foundUser) throw new UserNotFoundError("User Not Found");

    const newTemplate = new Template(
      new TemplateId(
        this.templateGeneratorUtilsRepository.generateId()
      ),
      new TemplateFilename(filename.originalname),
      content,
      new UserId(userId)
    );

    await this.templateGeneratorDbRepository.create(newTemplate);
    return newTemplate;
  }
}
