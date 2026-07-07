import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../lib/prisma.js";
import {
  AuthenticationError,
  NotFoundError,
} from "../../utils/errors.js";
import logger from "../../utils/logger.js";
import {
  USER_STATUS,
  EVENT_TYPES,
  SEVERITY_LEVELS,
} from "../../constants/http-status.js";

/**
 * Login service
 */
export async function loginService(email, password, ipAddress) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      logger.warn("Login attempt with non-existent email", { email, ipAddress });
      throw new AuthenticationError("Invalid credentials");
    }

    if (user.status !== USER_STATUS.ACTIVE) {
      logger.warn("Login attempt with inactive account", {
        userId: user.id,
        status: user.status,
        ipAddress,
      });
      throw new AuthenticationError("Account is not active");
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      await updateLoginAttempts(user.id, true);
      logger.warn("Failed login attempt", { userId: user.id, ipAddress });
      throw new AuthenticationError("Invalid credentials");
    }

    // Reset login attempts
    await updateLoginAttempts(user.id, false);

    // Create JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        status: user.status,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "24h" }
    );

    // Log security event
    await prisma.securityEvent.create({
      data: {
        userId: user.id,
        eventType: EVENT_TYPES.LOGIN_SUCCESS,
        severity: SEVERITY_LEVELS.LOW,
        description: "User login successful",
        ipAddress,
      },
    });

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    logger.info("User logged in successfully", { userId: user.id, email });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
      },
    };
  } catch (error) {
    logger.error("Login service error", { error: error.message });
    throw error;
  }
}

/**
 * Get current user info
 */
export async function getCurrentUserService(userId) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        department: true,
        lastLogin: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new NotFoundError("User");
    }

    return user;
  } catch (error) {
    logger.error("Get current user error", { error: error.message });
    throw error;
  }
}

/**
 * Update login attempts
 */
async function updateLoginAttempts(userId, isFailedAttempt) {
  try {
    if (isFailedAttempt) {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      const newAttempts = user.loginAttempts + 1;
      const isLocked = newAttempts >= 5;

      await prisma.user.update({
        where: { id: userId },
        data: {
          loginAttempts: newAttempts,
          status: isLocked ? USER_STATUS.LOCKED : user.status,
          lockedUntil: isLocked ? new Date(Date.now() + 30 * 60 * 1000) : null,
        },
      });

      if (isLocked) {
        logger.warn("User account locked due to failed login attempts", {
          userId,
        });
      }
    } else {
      await prisma.user.update({
        where: { id: userId },
        data: { loginAttempts: 0, lockedUntil: null },
      });
    }
  } catch (error) {
    logger.error("Update login attempts error", { error: error.message });
  }
}
