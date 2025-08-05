import { NextFunction, Request, Response } from "express";
// import { ServiceContainer } from "../../Shared/infrastructure/ServiceContainer";
// import { UserNotFoundError } from "../domain/UserNotFoundError";
import { ServiceContainer } from "../../../shared/ServiceContainer";
import { AuthInvalidCredentialsError } from "../../domain/errors";
// import { roles } from "../../../User/UserTypes";
import { LoginDTO, RegisterDTO } from "./DTO";
// import { roles } from "../../UserTypes";

export class ExpressAuthController {
  register = async (req: Request, res: Response, next: NextFunction) => {
    const { name, password, email }: RegisterDTO = req.body;

    try {
      await ServiceContainer.auth.register.run(name, email, password);

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  };

  // registerAdmin = async (req: Request, res: Response, next: NextFunction) => {
  //   const { name, password, email }: register = req.body;

  //   try {
  //     await ServiceContainer.auth.register.run(
  //       name,
  //       email,
  //       password,
  //       roles.Admin
  //     );

  //     res.status(200).send();
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  login = async (req: Request, res: Response, next: NextFunction) => {
    const { password, email }: LoginDTO = req.body;

    try {
      const data = await ServiceContainer.auth.login.run(email, password);

      res
        .status(200)
        .cookie("access_token", data.token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 1000 * 60 * 60,
        })
        .json({
          token: data.token,
        });
    } catch (error) {
      next(error);
    }
  };

  protectedRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new AuthInvalidCredentialsError(
          "Access denied: User not authenticated"
        );
      }

      res.status(200).json(req.user.mapToPrimitivesNoPassword());
    } catch (error) {
      next(error);
    }
  };

  logout = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.clearCookie("access_token").send();
    } catch (error) {
      next(error);
    }
  };
}
