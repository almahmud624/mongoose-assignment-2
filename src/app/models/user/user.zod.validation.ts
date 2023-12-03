import { z } from "zod";

const FullNameSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

const AddressSchema = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
});

export const OrdersSchema = z.object({
  productName: z.string().min(1),
  price: z.number().min(1),
  quantity: z.number().min(1),
});

export const OrdersValidationSchemaZod = z.union([
  z.array(OrdersSchema),
  OrdersSchema,
]);

export const UserValidationSchemaByZod = z.object({
  userId: z.number().min(1),
  username: z.string().min(1),
  password: z.string().optional(),
  fullName: FullNameSchema,
  age: z.number().min(1),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string().min(1)),
  address: AddressSchema,
  orders: z.array(OrdersSchema).optional(),
});
