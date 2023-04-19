import { Request, Response } from "express";

const failed = async (req: Request, res: Response) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
};

export default failed;
