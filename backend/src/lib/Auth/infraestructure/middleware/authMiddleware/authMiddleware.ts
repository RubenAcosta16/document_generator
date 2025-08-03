import { Request, Response, NextFunction } from "express";
import { AuthInvalidCredentialsError } from "../../../domain/errors";
import { verifyToken } from "./utils";
import { UserId } from "../../../../User/domain/Props/UserId";
import { UserName } from "../../../../User/domain/Props/UserName";
import { UserEmail } from "../../../../User/domain/Props/UserEmail";
import { User } from "../../../../User/domain/User";
import { UserPassword } from "../../../../User/domain/Props/UserPassword";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.access_token;

  try {
    if (!token) {
      throw new AuthInvalidCredentialsError("Access denied: No token provided");
    }

    const decoded = verifyToken(token);
    const { id, name, email } = decoded;

    // req.user = {
    //   id: new UserId(id),
    //   name: new UserName(name),
    //   email: new UserEmail(email),
    // } as OmitUser;

    req.user = new User(
      new UserId(id),
      new UserName(name),
      new UserEmail(email),
      new UserPassword("--------")
    );

    next();
  } catch (error) {
    next(error);
  }
};
