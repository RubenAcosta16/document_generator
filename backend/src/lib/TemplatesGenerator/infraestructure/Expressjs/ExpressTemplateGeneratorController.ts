import { NextFunction, Request, Response } from "express";
// import { ServiceContainer } from "../../Shared/infrastructure/ServiceContainer";
// import { UserNotFoundError } from "../domain/UserNotFoundError";
import { ServiceContainer } from "../../../shared/ServiceContainer";
import { TemplatesGeneratorError } from "../../domain/errors";
import { AuthInvalidCredentialsError } from "../../../Auth/domain/errors";
// import { roles } from "../../UserTypes";

export class ExpressTemplateGeneratorController {
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        throw new AuthInvalidCredentialsError(
          "Access denied: User not authenticated"
        );
      }

      const templates =
        await ServiceContainer.templateGenerator.getAllTemplates.run(
          req.user.id.value
        );
      // falta usuario
      res
        .json(templates.map((template) => template.mapToPrimitives()))
        .status(200);
    } catch (error) {
      next(error);
    }
  }

  async extractVariables(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { templateId } = req.params;
    try {
      if (!req.user) {
        throw new AuthInvalidCredentialsError(
          "Access denied: User not authenticated"
        );
      }

      const variables =
        await ServiceContainer.templateGenerator.extractVariablesFromDocx.run(
          templateId,
          req.user.id.value
        );

      res.json({ variables }).status(200);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // const { email, id, name, password } = req.body as {
      //   id: string;
      //   name: string;
      //   email: string;
      //   role: string;
      //   password: string;
      // };

      if (req.file === undefined) {
        throw new TemplatesGeneratorError("File is required");
        return;
      }

      if (!req.user) {
        throw new AuthInvalidCredentialsError(
          "Access denied: User not authenticated"
        );
      }

      const template = await ServiceContainer.templateGenerator.create.run(
        req.file,
        req.file?.buffer,
        req.user.id.value
      );

      res.status(201).json({
        templateId: template.id.value,
        filename: template.filename.value,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { templateId } = req.params;
    try {
      if (!req.user) {
        throw new AuthInvalidCredentialsError(
          "Access denied: User not authenticated"
        );
      }

      await ServiceContainer.templateGenerator.deleteTemplateById.run(
        templateId,
        req.user.id.value
      );

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async generateDocx(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { templateId, data } = req.body;

      console.log(data);

      if (!req.user) {
        throw new AuthInvalidCredentialsError(
          "Access denied: User not authenticated"
        );
      }

      const buf = await ServiceContainer.templateGenerator.generateDocx.run(
        templateId,
        data,
        req.user.id.value
      );

      res.status(201).send(buf);
    } catch (error) {
      next(error);
    }
  }
}
