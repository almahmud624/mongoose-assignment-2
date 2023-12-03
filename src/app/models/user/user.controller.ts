import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";
import {
  OrdersValidationSchemaZod,
  UserValidationSchemaByZod,
} from "./user.zod.validation";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body;
    const zodParseData = UserValidationSchemaByZod.parse(user);
    const result = await UserServices.createUserIntoDB(zodParseData);
    const { password, ...resUser } = result.toObject() || {};
    res.status(200).json({
      success: true,
      message: "User successfully created",
      data: resUser,
    });
  } catch (error) {
    next(error);
  }
};

const fetchAllUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await UserServices.fetchUserFromDB();
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.userId;
    const result = await UserServices.getSingleUserFromDB(id);
    const { password, ...resUser } = result?.toObject() || {};
    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: resUser,
    });
  } catch (error: any) {
    next(error);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.userId;
    const newData = req.body;
    const zodParseData = UserValidationSchemaByZod.parse(newData);
    const result = await UserServices.updateUserIntoDB(id, zodParseData);

    if (result.modifiedCount > 0) {
      const { password, ...restUser } = newData || {};
      res.status(200).json({
        success: true,
        message: "User successfully updated",
        data: restUser,
      });
    }
  } catch (error: any) {
    next(error);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.userId;
    await UserServices.deleteUserFromDB(id);
    res.status(200).json({
      success: true,
      message: "User successfully deleted",
      data: null,
    });
  } catch (error: any) {
    next(error);
  }
};

const createOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.userId;
    const orders = req.body;
    const zodParseData = OrdersValidationSchemaZod.parse(orders);
    const result = await UserServices.createUserOrders(id, zodParseData);
    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: null,
    });
  } catch (error: any) {
    next(error);
  }
};

const getUserAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.userId;
    const result = await UserServices.getUserAllOrdersFromDB(id);
    res.status(200).json({
      success: true,
      message: "Orders successfully fetched!",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

const calculatePrice = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.userId;
    const result = await UserServices.calculatePriceOfOrders(id);
    res.status(200).json({
      success: true,
      message: "Total price calculated successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

export const userController = {
  createUser,
  fetchAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
  createOrders,
  getUserAllOrders,
  calculatePrice,
};
