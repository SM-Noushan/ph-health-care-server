import { ErrorRequestHandler } from "express";
import { TErrorSource } from "../interface/error";
import { PrismaError } from "../error/handlePrismaError";
import { PrismaClientKnownRequestError } from "../../generated/prisma/runtime/library";

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || "Something went wrong!";
  let errorSources: TErrorSource = [
    {
      path: "",
      message,
    },
  ];
  let simplifiedError;
  if (error instanceof PrismaClientKnownRequestError)
    simplifiedError = PrismaError.prismaClientKnownRequestError(error);

  if (simplifiedError) {
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: process.env.NODE_ENV === "development" ? error.stack : "🥞",
    // myError: error,
  });
};

export default globalErrorHandler;
