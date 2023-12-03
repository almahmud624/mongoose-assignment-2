"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const user_model_1 = require("./user.model");
const createUserIntoDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.create(user);
});
const fetchUserFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.aggregate([
        { $project: { username: 1, fullName: 1, age: 1, email: 1, address: 1 } },
    ]);
});
const getSingleUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield user_model_1.User.isUserExists(userId))) {
        throw new Error("User Not Found");
    }
    return yield user_model_1.User.findOne({ userId });
});
const updateUserIntoDB = (userId, user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield user_model_1.User.isUserExists(userId))) {
        throw new Error("User Not Found");
    }
    const newData = user;
    return yield user_model_1.User.updateOne({ userId }, newData, { new: true });
});
const deleteUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield user_model_1.User.isUserExists(userId))) {
        throw new Error("User Not Found");
    }
    return yield user_model_1.User.deleteOne({ userId });
});
const createUserOrders = (userId, orders) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield user_model_1.User.isUserExists(userId))) {
        throw new Error("User Not Found");
    }
    return yield user_model_1.User.findOneAndUpdate({ userId }, { $push: { orders } }, { new: true });
});
const getUserAllOrdersFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield user_model_1.User.isUserExists(userId))) {
        throw {
            statusCode: 404,
            message: "User not found!",
        };
    }
    return yield user_model_1.User.aggregate([
        { $match: { userId: Number(userId) } },
        { $project: { orders: 1 } },
    ]);
});
const calculatePriceOfOrders = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield user_model_1.User.isUserExists(userId))) {
        throw new Error("User Not Found");
    }
    return yield user_model_1.User.aggregate([
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
});
exports.UserServices = {
    createUserIntoDB,
    fetchUserFromDB,
    getSingleUserFromDB,
    updateUserIntoDB,
    deleteUserFromDB,
    createUserOrders,
    getUserAllOrdersFromDB,
    calculatePriceOfOrders,
};
