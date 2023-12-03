import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (user: TUser) => {
  return await User.create(user);
};

export const UserServices = {
  createUserIntoDB,
};
