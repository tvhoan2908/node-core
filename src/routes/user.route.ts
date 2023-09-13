import { Router } from "express";
import { authMiddleware } from "../middlewares";
import { UserController } from "../modules/users/controllers/user.controller";
const router = Router();

/**
 * @openapi
 * /api/me:
 *  get:
 *    description: Get logged-in user info
 *    tags: [User]
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Returns object
 */
router.get("/api/me", authMiddleware(), UserController.getMe);

export default router;
