import { Router } from "express";
import { AuthController } from "../modules/users/controllers/auth.controller";
import { loginRequest } from "../modules/users/requests";
import { validateRequestMiddleware } from "../middlewares";

const router = Router();

router.post("/api/login", validateRequestMiddleware(loginRequest), AuthController.login);

export default router;
