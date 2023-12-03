"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidationSchemaByZod = exports.OrdersValidationSchemaZod = exports.OrdersSchema = void 0;
const zod_1 = require("zod");
const FullNameSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1),
    lastName: zod_1.z.string().min(1),
});
const AddressSchema = zod_1.z.object({
    street: zod_1.z.string().min(1),
    city: zod_1.z.string().min(1),
    country: zod_1.z.string().min(1),
});
exports.OrdersSchema = zod_1.z.object({
    productName: zod_1.z.string().min(1),
    price: zod_1.z.number().min(1),
    quantity: zod_1.z.number().min(1),
});
exports.OrdersValidationSchemaZod = zod_1.z.union([
    zod_1.z.array(exports.OrdersSchema),
    exports.OrdersSchema,
]);
exports.UserValidationSchemaByZod = zod_1.z.object({
    userId: zod_1.z.number().min(1),
    username: zod_1.z.string().min(1),
    password: zod_1.z.string().optional(),
    fullName: FullNameSchema,
    age: zod_1.z.number().min(1),
    email: zod_1.z.string().email(),
    isActive: zod_1.z.boolean(),
    hobbies: zod_1.z.array(zod_1.z.string().min(1)),
    address: AddressSchema,
    orders: zod_1.z.array(exports.OrdersSchema).optional(),
});
