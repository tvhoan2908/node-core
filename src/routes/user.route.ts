import { Router } from "express";
import { authMiddleware } from "../middlewares";
import { UserController } from "../modules/users/controllers/user.controller";
const router = Router();

router.get("/api/me", authMiddleware(), UserController.getMe);

export default router;
