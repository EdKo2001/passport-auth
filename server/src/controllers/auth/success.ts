import { Request, Response } from "express";

const success = async (req: Request, res: Response) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
    });
  } else {
    return res.status(422).json({
      message: "User is not found",
    });
  }
};

export default success;
