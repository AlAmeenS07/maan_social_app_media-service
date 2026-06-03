
import { NextFunction, Request, Response } from "express";
import { messages, statusCodes } from "../utils/constants";
import { logger } from "../config/logger";


export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export const errorHandler = (err: AppError, req: Request, res: Response, _next: NextFunction) => {
  logger.error(messages.REQUEST_FAILED, {
    requestId: req.headers["x-request-id"],
    userId: req.headers["x-user-id"] || null,
    method: req.method,
    route: req.originalUrl,
    error: err.message,
    stack: err.stack,
    service: messages.MEDIA_SERVICE
  });

  const statusCode = err.statusCode || statusCodes.INTERNAL_SERVER_ERROR;

  res.status(statusCode).json({
    success: false,
    message: err.message || statusCodes.INTERNAL_SERVER_ERROR,
  });
};