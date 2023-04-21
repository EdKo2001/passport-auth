import { Request, Response } from "express";

const google = (req: Request, res: Response) => {
  try {
    const user = req.user.user;
    const token = req.user.token;
    // res.status(200).json({ user, token });
    res.redirect(
      `${process.env.CLIENT_URL}/login/success?user=${JSON.stringify(
        user
      )}&token=${token}`
    );
  } catch (err) {
    console.error(err);
    res.status(503).json(err);
  }
};

export default google;
