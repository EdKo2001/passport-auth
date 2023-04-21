import nodemailer from "nodemailer";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { UserModel } from "../../models";

import { transporter } from "../../config";

const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.isApproved) {
      return res
        .status(401)
        .json({ message: "Please confirm your registration." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1m",
    });

    const mailOptions = {
      to: user.email,
      subject: "Reset Password",
      html: `
        <p>You requested a password reset for your account.</p>
        <p>Please click the link below to reset your password:</p>
        <a href="${process.env.CLIENT_URL}/update-password?token=${token}">${process.env.CLIENT_URL}/update-password?token=${token}</a>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.json({
      message: "Password reset email sent",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default resetPassword;
