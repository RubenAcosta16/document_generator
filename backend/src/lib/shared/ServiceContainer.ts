import { AuthLogin } from "../Auth/application/AuthLogin";
import { AuthRegister } from "../Auth/application/AuthRegister";
import { AuthTokenInfraestrucutre } from "../Auth/infraestructure/AuthTokenInfraestrucutre";
import { ExtractVariablesFromDocx } from "../Template/application/ExtractVariablesFromDocx";
import { GenerateDocx } from "../Template/application/GenerateDocx";
import { TemplateCreate } from "../Template/application/TemplateCreate";
import { TemplateDelete } from "../Template/application/TemplateDelete";
import { TemplateGeneratorGetAll } from "../Template/application/TemplateGetAll";
import { TemplateGetById } from "../Template/application/TemplateGetById";
import { InMemoryDbTemplateGenerator } from "../Template/infraestructure/InMemoryDbTemplateGenerator";
import { UtilsRepositoryTemplateGenerator } from "../Template/infraestructure/UtilsRepositoryTemplateGenerator";


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
    create: new TemplateCreate(
      templateGeneratorDbRepository,
      templateGeneratorUtilsRepository,
      userRepository
    ),
    getAllTemplates: new TemplateGeneratorGetAll(
      templateGeneratorDbRepository,
      userRepository
    ),
    deleteTemplateById: new TemplateDelete(
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
    getTemplateById: new TemplateGetById(
      templateGeneratorDbRepository
    ),
  },
};
