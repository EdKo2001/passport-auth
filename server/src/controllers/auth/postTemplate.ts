import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { templateModel } from "../../models";

const login = async (req: Request, res: Response) => {
  try {
    const user = await templateModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(422).json({
        message: "User is not found",
      });
    }

    const isValidPass = await bcrypt.compare(req.body.password, user.password);

    if (!isValidPass) {
      return res.status(400).json({
        message: "Invalid login or password",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
        role: user.role,
      },
      process.env.JWT as string,
      {
        expiresIn: "24h",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(503).json({
      message: "Failed to login",
    });
  }
};

export default login;
