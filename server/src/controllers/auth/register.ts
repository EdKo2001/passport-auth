import { NextFunction, Request, Response } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

import { IUser } from "../../models";

const register = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "register",
    { session: false },
    (err: Error, user: IUser, info: any) => {
      console.log(info, err, user);
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(400).json({ message: info?.message });
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      req.user = user;
      return res.json({
        message: "User has been created successfully",
        user: {
          email: user.email,
        },
        token,
      });
    }
  )(req, res, next);
};

export default register;
