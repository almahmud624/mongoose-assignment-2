import { Model } from "mongoose";

export type TFullname = { firstName: string; lastName: string };

export type TAddress = {
  street: string;
  city: string;
  country: string;
};

export type TOrder = {
  productName: string;
  price: number;
  quantity: number;
};

export type TOrders = TOrder[] | TOrder;

export type TUser = {
  userId: number;
  username: string;
  password?: string;
  fullName: TFullname;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TAddress;
  orders?: TOrder[];
};

export interface UserModel extends Model<TUser> {
  isUserExists(id: any): Promise<TUser | null>;
}
