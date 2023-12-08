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
  await checkUserExists(userId);

  return await User.findOne({ userId });
};

const updateUserIntoDB = async (userId: any, user: TUser) => {
  await checkUserExists(userId);

  const newData = user;
  return await User.updateOne({ userId }, newData, { new: true });
};

const deleteUserFromDB = async (userId: any) => {
  await checkUserExists(userId);

  return await User.deleteOne({ userId });
};

const createUserOrders = async (userId: any, orders: TOrders) => {
  await checkUserExists(userId);

  return await User.findOneAndUpdate(
    { userId },
    { $push: { orders } },
    { new: true }
  );
};

const getUserAllOrdersFromDB = async (userId: any) => {
  await checkUserExists(userId);

  return await User.aggregate([
    { $match: { userId: Number(userId) } },
    { $project: { orders: 1 } },
  ]);
};

const calculatePriceOfOrders = async (userId: any) => {
  await checkUserExists(userId);
  return await User.aggregate([
    { $match: { userId: Number(userId) } },
    {
      $unwind: "$orders",
    },
    {
      $group: {
        _id: "$userId",
        totalPrice: {
          $sum: {
            $multiply: ["$orders.price", "$orders.quantity"],
          },
        },
      },
    },
  ]);
};

// check user existance
const checkUserExists = async (userId: any) => {
  if (!(await User.isUserExists(userId))) {
    throw {
      code: 404,
      message: "User not found!",
    };
  }
};

export const UserServices = {
  createUserIntoDB,
  fetchUserFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
  deleteUserFromDB,
  createUserOrders,
  getUserAllOrdersFromDB,
  calculatePriceOfOrders,
};
