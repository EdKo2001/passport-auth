import { Document, Schema, Model, model } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  email: string;
  password: string;
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
      required: true,
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
  const user: IUser = this;
  if (user) {
    return await bcrypt.compare(password, user.password);
  }
};

export default model<IUser, UserModel>("User", UserSchema);
