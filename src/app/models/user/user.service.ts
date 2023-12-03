import { TOrders, TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (user: TUser) => {
  return await User.create(user);
};

const fetchUserFromDB = async () => {
  return await User.aggregate([
    { $project: { username: 1, fullName: 1, age: 1, email: 1, address: 1 } },
  ]);
};

const getSingleUserFromDB = async (userId: any) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error("User Not Found");
  }
  return await User.findOne({ userId });
};

const updateUserIntoDB = async (userId: any, user: TUser) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error("User Not Found");
  }
  const newData = user;
  return await User.updateOne({ userId }, newData, { new: true });
};

const deleteUserFromDB = async (userId: any) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error("User Not Found");
  }
  return await User.deleteOne({ userId });
};

const createUserOrders = async (userId: any, orders: TOrders) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error("User Not Found");
  }
  return await User.findOneAndUpdate(
    { userId },
    { $push: { orders } },
    { new: true }
  );
};

export const UserServices = {
  createUserIntoDB,
  fetchUserFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
  deleteUserFromDB,
  createUserOrders,
};
