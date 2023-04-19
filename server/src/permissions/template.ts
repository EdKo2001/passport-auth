import { NextFunction, Request, Response } from "express";

import ROLES from "../constants/ROLES";

export const canCreatePostType = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user.role !== ROLES.ADMIN) {
    return res.status(401).json("Not Allowed");
  }

  next();
};
