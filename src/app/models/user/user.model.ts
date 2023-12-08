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
  street: { type: String, required: [true, "Street name is required"] },
  city: { type: String, required: [true, "City name is required"] },
  country: { type: String, required: [true, "Country name is required"] },
});

const ordersSchema = new Schema<TOrders>({
  productName: { type: String, required: [true, "Product name is required"] },
  price: { type: Number, required: [true, "Price name is required"] },
  quantity: { type: Number, required: [true, "Quantity is required"] },
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
    required: [true, "Username is required"],
  },
  password: {
    type: String,
  },
  fullName: {
    type: fullnameSchema,
    required: [true, "Fullname is required"],
  },
  age: {
    type: Number,
    required: [true, "Age is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  hobbies: [{ type: String, required: [true, "Hobbies are required"] }],
  address: {
    type: addressSchema,
    required: [true, "Address is required"],
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
