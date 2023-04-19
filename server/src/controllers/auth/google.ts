import { Request, Response } from "express";

const google = (req: Request, res: Response) => {
  const user = req.user.user;
  const token = req.user.token;
  // res.status(200).json({ user, token });
  res.redirect(
    `${process.env.CLIENT_ORIGIN}/login/success?user=${JSON.stringify(
      user
    )}&token=${token}`
  );
};

export default google;
