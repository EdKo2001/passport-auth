import { Schema } from "mongoose";

import { ROLES } from "../constants";

declare global {
  namespace Express {
    interface Request {
      user: {
        id?: Schema.Types.ObjectId;
        role?: ROLES;
      };
    }
    interface Response {
      paginate: any;
    }
  }
}
