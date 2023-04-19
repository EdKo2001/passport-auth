import { Schema } from "mongoose";

declare module "express" {
  export interface Request {
    user: {
      id?: Schema.Types.ObjectId;
      token?: string;
      user?: {
        email: string;
      };
    };
  }
}
