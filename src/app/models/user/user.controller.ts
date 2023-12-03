import { Request, Response } from "express";
import { UserServices } from "./user.service";
import { UserValidationSchemaByZod } from "./user.zod.validation";

const createUser = async (req: Request, res: Response) => {
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
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};

export const userController = {
  createUser,
};
