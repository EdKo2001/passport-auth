import { Request, Response } from "express";

const logout = async (req: Request, res: Response) => {
  try {
    // req.logout(() => {});
    res.status(204).json();
  } catch (error) {
    console.error(error);
    res.status(503).json({
      message: "Failed to logout",
    });
  }
};

export default logout;
