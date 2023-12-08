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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../../config"));
const fullnameSchema = new mongoose_1.Schema({
    firstName: { type: String, required: [true, "First Name is required"] },
    lastName: { type: String, required: [true, "Last Name is required"] },
});
const addressSchema = new mongoose_1.Schema({
    street: { type: String, required: [true, "Street name is required"] },
    city: { type: String, required: [true, "City name is required"] },
    country: { type: String, required: [true, "Country name is required"] },
});
const ordersSchema = new mongoose_1.Schema({
    productName: { type: String, required: [true, "Product name is required"] },
    price: { type: Number, required: [true, "Price name is required"] },
    quantity: { type: Number, required: [true, "Quantity is required"] },
});
const userSchema = new mongoose_1.Schema({
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
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (user === null || user === void 0 ? void 0 : user.password) {
            user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt_rounds));
        }
        next();
    });
});
// remove password property from response
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        user.password = "";
        next();
    });
});
// check user existance
userSchema.statics.isUserExists = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield exports.User.findOne({ userId: id });
        return existingUser;
    });
};
exports.User = (0, mongoose_1.model)("User", userSchema);
