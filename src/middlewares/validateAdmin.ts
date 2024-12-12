import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Request } from "../types/request.types";

export const validateAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.admin) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Unauthorized requests." })
      .end();
    return;
  }
  next();
};
