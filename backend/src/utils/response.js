/**
 * Success response formatter
 */
export function successResponse(data, message = "Success", statusCode = 200) {
  return {
    success: true,
    message,
    data,
    statusCode,
  };
}

/**
 * Paginated response formatter
 */
export function paginatedResponse(data, page, limit, total, message = "Success") {
  return {
    success: true,
    message,
    data,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
}

/**
 * Error response formatter
 */
export function errorResponse(error, statusCode = 500) {
  return {
    success: false,
    error,
    statusCode,
  };
}