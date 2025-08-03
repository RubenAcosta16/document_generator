import { AuthLogin } from "../Auth/application/AuthLogin";
import { AuthRegister } from "../Auth/application/AuthRegister";
import { AuthTokenInfraestrucutre } from "../Auth/infraestructure/AuthTokenInfraestrucutre";
import { ExtractVariablesFromDocx } from "../TemplatesGenerator/application/ExtractVariablesFromDocx";
import { GenerateDocx } from "../TemplatesGenerator/application/GenerateDocx";
import { TemplateGeneratorCreate } from "../TemplatesGenerator/application/TemplateGeneratorCreate";
import { TemplateGeneratorDelete } from "../TemplatesGenerator/application/TemplateGeneratorDelete";
import { TemplateGeneratorGetAll } from "../TemplatesGenerator/application/TemplateGeneratorGetAll";
import { TemplateGeneratorGetById } from "../TemplatesGenerator/application/TemplateGeneratorGetById";
import { InMemoryDbTemplateGenerator } from "../TemplatesGenerator/infraestructure/InMemoryDbTemplateGenerator";
import { UtilsRepositoryTemplateGenerator } from "../TemplatesGenerator/infraestructure/UtilsRepositoryTemplateGenerator";

import { UserCreate } from "../User/application/UserCreate";
import { UserDelete } from "../User/application/UserDelete";
import { UserFindAll } from "../User/application/UserFindAll";
import { UserFindById } from "../User/application/UserfindById";
import { UserUpdate } from "../User/application/UserUpdate";
import { InMemoryUserRepository } from "../User/infrastructure/db/InMemoryUserRepository";

const userRepository = new InMemoryUserRepository();
const authRepository = new AuthTokenInfraestrucutre();

const templateGeneratorDbRepository = new InMemoryDbTemplateGenerator();
const templateGeneratorUtilsRepository = new UtilsRepositoryTemplateGenerator();

// const userRepository = new PostgresUserRepository("url");

export const ServiceContainer = {
  user: {
    getAll: new UserFindAll(userRepository),
    getOneById: new UserFindById(userRepository),
    create: new UserCreate(userRepository),
    edit: new UserUpdate(userRepository),
    delete: new UserDelete(userRepository),
  },
  auth: {
    login: new AuthLogin(userRepository, authRepository),
    register: new AuthRegister(userRepository, authRepository),
  },
  templateGenerator: {
    create: new TemplateGeneratorCreate(
      templateGeneratorDbRepository,
      templateGeneratorUtilsRepository,
      userRepository
    ),
    getAllTemplates: new TemplateGeneratorGetAll(
      templateGeneratorDbRepository,
      userRepository
    ),
    deleteTemplateById: new TemplateGeneratorDelete(
      templateGeneratorDbRepository
    ),
    generateDocx: new GenerateDocx(
      templateGeneratorDbRepository,
      templateGeneratorUtilsRepository
    ),
    extractVariablesFromDocx: new ExtractVariablesFromDocx(
      templateGeneratorDbRepository,
      templateGeneratorUtilsRepository
    ),
    getTemplateById: new TemplateGeneratorGetById(
      templateGeneratorDbRepository
    ),
  },
};
