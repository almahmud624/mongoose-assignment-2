import express from "express";
import { userController } from "./user.controller";

const router = express.Router();

router.post("/create", userController.createUser);
router.get("/", userController.fetchAllUser);
router.get("/:userId", userController.getSingleUser);
router.put("/:userId", userController.updateUser);
router.delete("/:userId", userController.deleteUser);
export const userRoutes = router;
