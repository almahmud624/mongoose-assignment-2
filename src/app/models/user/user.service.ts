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

export const UserServices = {
  createUserIntoDB,
  fetchUserFromDB,
  getSingleUserFromDB,
};
