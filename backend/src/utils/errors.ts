/**
 * Custom error class for API responses
 */
export class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = "AppError";
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Validation error
 */
export class ValidationError extends AppError {
  constructor(message = "Validation failed", details = []) {
    super(message, 400);
    this.name = "ValidationError";
    this.details = details;
  }
}

/**
 * Authentication error
 */
export class AuthenticationError extends AppError {
  constructor(message = "Authentication failed") {
    super(message, 401);
    this.name = "AuthenticationError";
  }
}

/**
 * Authorization error
 */
export class AuthorizationError extends AppError {
  constructor(message = "Insufficient permissions") {
    super(message, 403);
    this.name = "AuthorizationError";
  }
}

/**
 * Not found error
 */
export class NotFoundError extends AppError {
  constructor(resource = "Resource") {
    super(`${resource} not found`, 404);
    this.name = "NotFoundError";
  }
}

/**
 * Conflict error
 */
export class ConflictError extends AppError {
  constructor(message = "Resource already exists") {
    super(message, 409);
    this.name = "ConflictError";
  }
}

/**
 * Rate limit error
 */
export class RateLimitError extends AppError {
  constructor(message = "Too many requests") {
    super(message, 429);
    this.name = "RateLimitError";
  }
}
