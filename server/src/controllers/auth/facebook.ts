import { Request, Response } from "express";

const facebook = (req: Request, res: Response) => {
  res.redirect(`${process.env.CLIENT_ORIGIN}/login/success`);
};

export default facebook;
