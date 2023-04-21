import { Request, Response } from "express";

const facebook = (req: Request, res: Response) => {
  res.redirect(`${process.env.CLIENT_URL}/login/success`);
};

export default facebook;
