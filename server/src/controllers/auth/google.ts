import { Request, Response } from "express";

const google = (req: Request, res: Response) => {
  res.redirect(`${process.env.CLIENT_ORIGIN}/login/success`);
};

export default google;
