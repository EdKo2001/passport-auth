import { Request, Response, NextFunction } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

import { IUser } from "../../models";

const login = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "local",
    { session: false },
    (err: Error, user: IUser, info: any) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: info.message });
      }
      if (!user.isApproved) {
        return res
          .status(401)
          .json({ message: "Please confirm your registration." });
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      req.user = user;
      return res.json({
        user: {
          email: user.email,
        },
        token,
      });
    }
  )(req, res, next);
};

export default login;
