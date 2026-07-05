import { z } from "zod";
import { loginSchema, passwordChangeSchema } from "../../schemas/validation.schemas.js";
import { loginService, getCurrentUserService } from "./auth.services.js";
import logger from "../../utils/logger.js";
import { successResponse } from "../../utils/response.js";
import { HTTP_STATUS, MESSAGES } from "../../constants/http-status.js";

/**
 * Login controller
 * POST /auth/login
 */
export async function loginController(req, res, next) {
  try {
    const parsed = loginSchema.parse(req.body);
    const result = await loginService(
      parsed.email,
      parsed.password,
      req.metadata?.ip
    );

    return res.status(HTTP_STATUS.OK).json(successResponse(result, MESSAGES.SUCCESS));
  } catch (error) {
    next(error);
  }
}

/**
 * Get current user controller
 * GET /auth/me
 */
export async function getCurrentUserController(req, res, next) {
  try {
    const user = await getCurrentUserService(req.user.id);
    return res
      .status(HTTP_STATUS.OK)
      .json(successResponse(user, MESSAGES.SUCCESS));
  } catch (error) {
    next(error);
  }
}

/**
 * Logout controller
 * POST /auth/logout
 */
export async function logoutController(req, res, next) {
  try {
    logger.info("User logged out", { userId: req.user.id });
    return res.status(HTTP_STATUS.OK).json(
      successResponse(
        { message: "Logged out successfully" },
        MESSAGES.SUCCESS
      )
    );
  } catch (error) {
    next(error);
  }
}