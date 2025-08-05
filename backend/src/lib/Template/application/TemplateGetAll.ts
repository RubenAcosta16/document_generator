import { UserNotFoundError } from "../../User/domain/errors";
import { UserId } from "../../User/domain/Props/UserId";
import { UserRepository } from "../../User/domain/UserRepository";
import { TemplateError } from "../domain/errors";
import { TemplateGeneratorDbRepository } from "../domain/repository/TemplateGeneratorDbRepository";
import { Template } from "../domain/Template";

export class TemplateGeneratorGetAll {
  constructor(
    private repository: TemplateGeneratorDbRepository,
    private userRepository: UserRepository
  ) {}

  /**
   * The function `run` in TypeScript is an asynchronous method that retrieves templates based on user
   * ID, page number, and limit, with pagination validation.
   * @param {string} userId - The `userId` parameter is a string that represents the unique identifier
   * of a user.
   * @param {string} [page] - The `page` parameter is used for pagination and represents the page
   * number of the results you want to retrieve. It is an optional parameter, so you can choose to
   * include it or not when calling the `run` function. If provided, it should be a string that can be
   * converted to a number
   * @param {string} [limit] - The `limit` parameter in the `run` function specifies the maximum number
   * of items to return in a single page of results. It is used for pagination purposes to control the
   * number of items displayed at once. If not provided, the function will return all available items
   * without limiting the number of results per
   * @returns The `run` function is returning a Promise that resolves to an array of `Template`
   * objects.
   */
  async run(
    userId: string,
    page?: string,
    limit?: string
  ): Promise<Template[]> {
    let pageNum: number | undefined;
    let limitNum: number | undefined;

    // Conversión de strings a number si existen
    if (page !== undefined) {
      pageNum = Number(page);
    }
    if (limit !== undefined) {
      limitNum = Number(limit);
    }

    // Validaciones de paginación
    if (pageNum !== undefined || limitNum !== undefined) {
      // no tiene sentido volver a validad que no sea undefined, pero typescript me exige hacer esto :(
      if (pageNum === undefined || limitNum === undefined) {
        throw new TemplateError(
          "Si usas paginación, debes especificar tanto 'page' como 'limit'"
        );
      }

      if (!Number.isInteger(pageNum) || pageNum <= 0) {
        throw new TemplateError("'page' debe ser un número entero positivo");
      }

      if (!Number.isInteger(limitNum) || limitNum <= 0) {
        throw new TemplateError("'limit' debe ser un número entero positivo");
      }

      if (limitNum > 100) {
        throw new TemplateError("'limit' no puede ser mayor que 100");
      }
    }

    const userIdClass = new UserId(userId);
    const foundUser = await this.userRepository.findById(userIdClass);
    if (!foundUser) throw new UserNotFoundError("User Not Found");

    return await this.repository.getAllTemplates(
      userIdClass,
      pageNum,
      limitNum
    );
  }
}
