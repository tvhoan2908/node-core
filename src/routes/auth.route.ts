import { Router } from "express";
import { AuthController } from "../modules/users/controllers/auth.controller";
import { loginRequest } from "../modules/users/requests";
import { validateRequestMiddleware } from "../middlewares";

const router = Router();

/**
 * @openapi
 * /api/login:
 *  post:
 *    description: Api login system
 *    tags: [Auth]
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required: [username, password]
 *            properties:
 *              username:
 *                type: string
 *                required: true
 *                example: admin
 *              password:
 *                type: string
 *                required: true
 *                example: 123456
 *    responses:
 *      200:
 *        description: Returns token and refresh token
 */
router.post("/api/login", validateRequestMiddleware(loginRequest), AuthController.login);

export default router;
