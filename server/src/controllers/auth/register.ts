import { NextFunction, Request, Response } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

import { IUser } from "../../models";
import { transporter } from "../../config";

const register = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "register",
    { session: false },
    (err: Error, user: IUser, info: any) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(400).json({ message: info?.message });
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1m",
      });
      const mailOptions = {
        to: user.email,
        subject: "Please confirm your account",
        html: `<p>Dear user,</p><p>Please click the following link to confirm your registration:</p><p><a href="${process.env.CLIENT_ORIGIN}/register/confirm?token=${token}">Confirm Account</a></p>`,
      };
      transporter
        .sendMail(mailOptions)
        .then((info) => console.log(`Email sent: ${info.messageId}`))
        .catch((error) => console.error(error));
      req.user = user;
      return res.status(201).json({
        message:
          "User has been created successfully, please confirm your registration by checking your inbox",
      });
    }
  )(req, res, next);
};

export default register;
