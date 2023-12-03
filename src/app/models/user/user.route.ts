import express from "express";
import { userController } from "./user.controller";

const router = express.Router();

router.post("/", userController.createUser);
router.get("/", userController.fetchAllUser);
router.get("/:userId", userController.getSingleUser);
router.put("/:userId", userController.updateUser);
router.delete("/:userId", userController.deleteUser);
router.put("/:userId/orders", userController.createOrders);
router.get("/:userId/orders", userController.getUserAllOrders);
router.get("/:userId/orders/total-price", userController.calculatePrice);

export const userRoutes = router;
