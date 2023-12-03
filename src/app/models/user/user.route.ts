import express from "express";
import { userController } from "./user.controller";

const router = express.Router();

router.post("/create", userController.createUser);
router.get("/", userController.fetchAllUser);

export const userRoutes = router;
