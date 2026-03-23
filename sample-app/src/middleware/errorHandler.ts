import type { NextFunction, Request, Response } from 'express';

export class ApiError extends Error {
  statusCode: number;
  details?: unknown;

  constructor(statusCode: number, message: string, details?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}

export function notFoundHandler(_request: Request, _response: Response, next: NextFunction): void {
  next(new ApiError(404, 'Route not found'));
}

export function errorHandler(
  error: Error | ApiError,
  _request: Request,
  response: Response,
  _next: NextFunction,
): void {
  void _next;

  const statusCode = error instanceof ApiError ? error.statusCode : 500;
  const details = error instanceof ApiError ? error.details : undefined;

  response.status(statusCode).json({
    error: {
      message: error.message || 'Unexpected server error',
      details,
    },
  });
}
