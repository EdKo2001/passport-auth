import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { transporter } from "../../config";

import { UserModel } from "../../models";

const updatePassword = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Invalid token" });
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET) as {
        id: string;
      };
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({
          message:
            "The token has been expired, please reset your password again",
        });
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    }

    const user = await UserModel.findById(decodedToken.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS))
    );

    user.password = hashedPassword;

    await user.save();

    const mailOptions = {
      to: user.email,
      subject: "Password Update",
      html: `
          <p>Your password has been successfully updated</p>
          <a href="${process.env.CLIENT_URL}/login">Login</a>
        `,
    };

    await transporter.sendMail(mailOptions);

    return res.json({
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default updatePassword;
