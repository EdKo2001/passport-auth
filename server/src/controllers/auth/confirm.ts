import { Request, Response } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { transporter } from "../../config";
import { IUser, UserModel } from "../../models";

const confirm = async (req: Request, res: Response) => {
  passport.authenticate(
    "jwt",
    { session: false },
    async (err: Error, user: IUser) => {
      if (err || !user) {
        try {
          jwt.verify(
            req.headers.authorization.split(" ")[1],
            process.env.JWT_SECRET
          );
        } catch (err) {
          if (err.name === "TokenExpiredError") {
            return res.status(404).json({
              message:
                "The token has been expired, please check your inbox for a new email",
            });
          } else {
            return res.status(404).json({ message: "User not found" });
          }
        }
      }

      if (user.isApproved) {
        return res.status(401).json({
          message: "Your account has already been approved",
        });
      }

      try {
        await UserModel.findByIdAndUpdate(user._id, { isApproved: true });
        const mailOptions = {
          to: user.email,
          subject: "Your account has been approved",
          html: "<p>Congratulations, your account has been approved!</p><p>Thank you for using our service.</p>",
        };
        await transporter.sendMail(mailOptions);
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      req.user = user;

      res.json({
        token,
        user: { email: user.email },
        message: "Your account has been approved",
      });
    }
  )(req, res);
};

export default confirm;
