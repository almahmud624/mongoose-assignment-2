import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import config from "../../config";
import {
  TAddress,
  TFullname,
  TOrders,
  TUser,
  UserModel,
} from "./user.interface";

const fullnameSchema = new Schema<TFullname>({
  firstName: { type: String, required: [true, "First Name is required"] },
  lastName: { type: String, required: [true, "Last Name is required"] },
});

const addressSchema = new Schema<TAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const ordersSchema = new Schema<TOrders>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const userSchema = new Schema<TUser, UserModel>({
  userId: {
    type: Number,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
  },
  fullName: {
    type: fullnameSchema,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  hobbies: [{ type: String, required: true }],
  address: {
    type: addressSchema,
    required: true,
  },
  orders: [{ type: ordersSchema }],
});

// hash the password for storing in DB
userSchema.pre("save", async function (next) {
  const user = this;
  if (user?.password) {
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds)
    );
  }
  next();
});

// remove password property from response
userSchema.pre("save", async function (next) {
  const user = this;
  user.password = "";
  next();
});

// check user existance
userSchema.statics.isUserExists = async function (id) {
  const existingUser = await User.findOne({ userId: id });
  return existingUser;
};
export const User = model<TUser, UserModel>("User", userSchema);
