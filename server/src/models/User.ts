import { Document, Schema, Model, model } from "mongoose";
import bcrypt from "bcrypt";

import { AUTH_TYPE, PROVIDER_TYPE } from "../constants";

export interface IUser extends Document {
  email: string;
  password: string;
  type: AUTH_TYPE;
  provider?: PROVIDER_TYPE;
  verifyPassword(password: string): boolean;
}

export type UserModel = Model<any>;

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: function () {
        return this.type === AUTH_TYPE.MANUAL;
      },
    },
    type: {
      type: String,
      required: true,
      enum: Object.values(AUTH_TYPE),
      default: AUTH_TYPE.MANUAL,
    },
    provider: {
      type: String,
      enum: Object.values(PROVIDER_TYPE),
      required: function () {
        return this.type === AUTH_TYPE.SOCIAL;
      },
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.generateHash = async (password: string) => {
  return await bcrypt.hash(
    password,
    bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS))
  );
};

UserSchema.methods.verifyPassword = async function (password: string) {
  try {
    const user: IUser = this;
    if (user) {
      return await bcrypt.compare(password, user.password);
    }
  } catch (err) {
    console.log(err);
  }
};

export default model<IUser, UserModel>("User", UserSchema);
