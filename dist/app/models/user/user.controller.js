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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("./user.service");
const user_zod_validation_1 = require("./user.zod.validation");
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const zodParseData = user_zod_validation_1.UserValidationSchemaByZod.parse(user);
        const result = yield user_service_1.UserServices.createUserIntoDB(zodParseData);
        const _a = result.toObject() || {}, { password } = _a, resUser = __rest(_a, ["password"]);
        res.status(200).json({
            success: true,
            message: "User successfully created",
            data: resUser,
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error: {
                code: 500,
                description: error,
            },
        });
    }
});
const fetchAllUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.UserServices.fetchUserFromDB();
        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getSingleUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.userId;
        const result = yield user_service_1.UserServices.getSingleUserFromDB(id);
        const _b = (result === null || result === void 0 ? void 0 : result.toObject()) || {}, { password } = _b, resUser = __rest(_b, ["password"]);
        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: resUser,
        });
    }
    catch (error) {
        next(error);
    }
});
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.userId;
        const newData = req.body;
        const zodParseData = user_zod_validation_1.UserValidationSchemaByZod.parse(newData);
        const result = yield user_service_1.UserServices.updateUserIntoDB(id, zodParseData);
        if (result.modifiedCount > 0) {
            const _c = newData || {}, { password } = _c, restUser = __rest(_c, ["password"]);
            res.status(200).json({
                success: true,
                message: "User successfully updated",
                data: restUser,
            });
        }
    }
    catch (error) {
        next(error);
    }
});
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.userId;
        yield user_service_1.UserServices.deleteUserFromDB(id);
        res.status(200).json({
            success: true,
            message: "User successfully deleted",
            data: null,
        });
    }
    catch (error) {
        next(error);
    }
});
const createOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.userId;
        const orders = req.body;
        const zodParseData = user_zod_validation_1.OrdersValidationSchemaZod.parse(orders);
        const result = yield user_service_1.UserServices.createUserOrders(id, zodParseData);
        res.status(200).json({
            success: true,
            message: "Order created successfully!",
            data: null,
        });
    }
    catch (error) {
        next(error);
    }
});
const getUserAllOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.userId;
        const result = yield user_service_1.UserServices.getUserAllOrdersFromDB(id);
        res.status(200).json({
            success: true,
            message: "Orders successfully fetched!",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const calculatePrice = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.userId;
        const result = yield user_service_1.UserServices.calculatePriceOfOrders(id);
        res.status(200).json({
            success: true,
            message: "Total price calculated successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.userController = {
    createUser,
    fetchAllUser,
    getSingleUser,
    updateUser,
    deleteUser,
    createOrders,
    getUserAllOrders,
    calculatePrice,
};
