import { Request, Response, NextFunction } from "express";
// import {} from "../../errorFactory";
import { UserError, UserNotFoundError } from "../../../User/domain/errors";
import { AuthInvalidCredentialsError } from "../../../Auth/domain/errors";
import { TemplateError, TemplateNotFoundError } from "../../../Template/domain/errors";
// import { ImageError } from "../../../Image/domain/errors";

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    err instanceof AuthInvalidCredentialsError ||
    err instanceof UserError ||
    err instanceof TemplateError
    // err instanceof ImageError
  ) {
    return res.status(400).json({
      message: err.message,
    });
  }

  if (err instanceof UserNotFoundError || err instanceof TemplateNotFoundError) {
    return res.status(404).json({
      message: err.message,
    });
  }


  return res.status(500).json({ message: "Internal server error" });
};
